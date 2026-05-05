importScripts("scram/scramjet_bundled.js?v=33");
console.log("%c[frosted]%c service worker v33 starting...", "color: #00ffa6; font-weight: bold;", "");

importScripts("uv/uv.bundle.js?v=33");
importScripts("uv/uv.config.js?v=33");
importScripts("baremux/index.js?v=5");
self.Ultraviolet.BareClient = self.BareMux.BareClient;
importScripts("uv/uv.sw.js?v=33");

const { ScramjetServiceWorker } = self.$scramjetLoadWorker();
const uv = new self.UVServiceWorker();

const SEED_CONFIG = {
	prefix: "/scram/",
	globals: {
		wrapfn: "$scramjet$wrap",
		wrappropertybase: "$scramjet__",
		wrappropertyfn: "$scramjet$prop",
		cleanrestfn: "$scramjet$clean",
		importfn: "$scramjet$import",
		rewritefn: "$scramjet$rewrite",
		metafn: "$scramjet$meta",
		wrappostmessagefn: "$scramjet$postmessage",
		pushsourcemapfn: "$scramjet$pushsourcemap",
		trysetfn: "$scramjet$tryset",
		templocid: "$scramjet$temploc",
		tempunusedid: "$scramjet$tempunused"
	},
	files: {
		all: "/scram/scramjet_bundled.js",
		wasm: "/scram/scramjet.wasm"
	},
	flags: {
		serviceworkers: false,
		syncxhr: false,
		strictRewrites: false,
		rewriterLogs: false,
		captureErrors: true,
		cleanErrors: false,
		scramitize: false,
		sourcemaps: true,
		destructureRewrites: false,
		interceptDownloads: false,
		allowInvalidJs: true,
		allowFailedIntercepts: true
	},
	siteFlags: {},
	codec: {
		encode: "e => e ? encodeURIComponent(e) : e",
		decode: "e => e ? decodeURIComponent(e) : e"
	}
};

const REQUIRED_STORES = ["config", "cookies", "redirectTrackers", "referrerPolicies", "publicSuffixList"];

let scramjet = null;
let scramjetInitDone = false;
let scramjetInitPromise = null;

function pathStartsWith(pathname, prefix) {
	if (!prefix) return false;
	try {
		return String(pathname || "").startsWith(String(prefix));
	} catch {
		return false;
	}
}

function shouldBypassProxyForRequest(request) {
	try {
		const url = new URL(request.url);
		if (url.origin !== self.location.origin) return false;

		const scramjetPrefix = SEED_CONFIG?.prefix || "/scram/";
		const uvServicePrefix = self.__uv$config?.prefix || "/uv/service/";

		if (pathStartsWith(url.pathname, scramjetPrefix)) {
			// Bypass for Scramjet's own library assets to avoid circular dependencies
			const filename = url.pathname.split("/").pop();
			if (filename.endsWith(".js") || filename.endsWith(".wasm") || filename.endsWith(".mjs") || filename === "") {
				return true;
			}
			// If it's the prefix itself without an encoded URL, it's not a proxy request
			if (url.pathname === scramjetPrefix || url.pathname === scramjetPrefix + "/") {
				return true;
			}
			return false;
		}
		if (pathStartsWith(url.pathname, uvServicePrefix)) return true;

		// Same-origin app shell assets and ordinary site requests should go to the
		// network directly instead of being inspected by proxy runtimes.
		return true;
	} catch {
		return false;
	}
}

function isRecoverableScramjetDbError(error) {
	const name = String(error?.name || "");
	const message = String(error?.message || error || "").toLowerCase();
	return (
		name === "NotFoundError" ||
		name === "AbortError" ||
		name === "VersionError" ||
		message.includes("object stores was not found") ||
		message.includes("one of the specified object stores was not found") ||
		message.includes("database connection is closing")
	);
}

async function ensureScramjetDB() {
	try {
		const db = await new Promise((resolve, reject) => {
			const req = indexedDB.open("$scramjet");
			req.onsuccess = () => resolve(req.result);
			req.onerror = () => reject(req.error);
		});
		const missing = REQUIRED_STORES.filter(s => !db.objectStoreNames.contains(s));
		if (missing.length === 0) {
			try {
				const tx = db.transaction("config", "readonly");
				const store = tx.objectStore("config");
				const existing = await new Promise((res, rej) => {
					const r = store.get("config");
					r.onsuccess = () => res(r.result);
					r.onerror = () => rej(r.error);
				});
				if (existing && existing.prefix) {
					db.close();
					return;
				}
			} catch (e) { }

			try {
				const tx2 = db.transaction("config", "readwrite");
				const store2 = tx2.objectStore("config");
				store2.put(SEED_CONFIG, "config");
				await new Promise(res => { tx2.oncomplete = res; tx2.onerror = res; });
				console.log("[frosted] SW: wrote seed config to existing DB.");
			} catch (e) { }
			db.close();
			return;
		}
		db.close();

		await new Promise(resolve => {
			const req = indexedDB.deleteDatabase("$scramjet");
			req.onsuccess = resolve;
			req.onerror = resolve;
			req.onblocked = resolve;
		});

		const newDb = await new Promise((resolve, reject) => {
			const req = indexedDB.open("$scramjet", 1);
			req.onupgradeneeded = (event) => {
				const db = event.target.result;
				for (const store of REQUIRED_STORES) {
					if (!db.objectStoreNames.contains(store)) {
						db.createObjectStore(store);
					}
				}
			};
			req.onsuccess = (event) => resolve(event.target.result);
			req.onerror = () => reject(req.error);
		});

		try {
			const tx = newDb.transaction("config", "readwrite");
			const store = tx.objectStore("config");
			store.put(SEED_CONFIG, "config");
			await new Promise(res => { tx.oncomplete = res; tx.onerror = res; });
			console.log("[frosted] SW: created $scramjet DB with stores and seed config.");
		} catch (e) { }
		newDb.close();
	} catch (e) {
	}
}

async function requestTransportFromClient(client, timeoutMs = 1500) {
	return new Promise((resolve) => {
		const channel = new MessageChannel();
		let settled = false;
		const finish = (value) => {
			if (settled) return;
			settled = true;
			try {
				channel.port1.onmessage = null;
				channel.port1.close();
			} catch { }
			resolve(value || null);
		};
		const timer = setTimeout(() => finish(null), timeoutMs);
		channel.port1.onmessage = (event) => {
			clearTimeout(timer);
			finish(event.data || null);
		};
		try {
			client.postMessage({ type: "getPort", port: channel.port2 }, [channel.port2]);
		} catch {
			clearTimeout(timer);
			finish(null);
		}
	});
}

async function getTransport() {
	const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
	if (!clients || clients.length === 0) {
		return null;
	}
	for (const client of clients) {
		const port = await requestTransportFromClient(client);
		if (port) return port;
	}
	return null;
}

async function getScramjet() {
	if (scramjetInitDone) return scramjet;
	if (scramjetInitPromise) return scramjetInitPromise;

	scramjetInitPromise = (async () => {
		await ensureScramjetDB();

		try {
			scramjet = new ScramjetServiceWorker(SEED_CONFIG);
		} catch (e) {
			console.error("[frosted] ScramjetServiceWorker instantiation failed:", e);
			scramjetInitDone = true;
			return null;
		}

		try {
			await scramjet.loadConfig();
		} catch (e) {
			console.warn("[frosted] SW: scramjet.loadConfig() failed, using SEED_CONFIG.", e);
		}

		scramjetInitDone = true;
		console.log("[frosted] Scramjet SW initialized.");
		// Ensure transport is set if possible
		try {
			console.log("[frosted] SW: requesting transport port from clients...");
			const port = await getTransport();
			if (port) {
				if (typeof scramjet.setTransport === "function") {
					scramjet.setTransport(port);
				} else if (typeof scramjet.setBareMuxPort === "function") {
					scramjet.setBareMuxPort(port);
				}
				console.log("[frosted] SW: obtained transport port from client.");
			} else {
				console.warn("[frosted] SW: no transport port received from clients. proxy might fail.");
			}
		} catch (e) {
			console.warn("[frosted] SW: failed to obtain transport port:", e);
		}

		scramjetInitDone = true;
		return scramjet;
	})();

	return scramjetInitPromise;
}

self.addEventListener("message", (event) => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
	// Also allow main thread to push a port directly
	if (event.data && event.data.type === "setPort" && event.data.port) {
		getScramjet().then(sj => {
			if (sj) {
				if (typeof sj.setTransport === "function") {
					sj.setTransport(event.data.port);
				} else if (typeof sj.setBareMuxPort === "function") {
					sj.setBareMuxPort(event.data.port);
				}
				console.log("[frosted] SW: transport port received from page.");
			}
		});
	}
});

self.addEventListener("fetch", (event) => {
	event.respondWith((async () => {
		if (shouldBypassProxyForRequest(event.request)) {
			try {
				return await fetch(event.request);
			} catch (error) {
				console.warn("[frosted] SW direct fetch failed:", event.request.url, error);
				return Response.error();
			}
		}

		try {
			const sj = await getScramjet();
			if (sj && sj.route(event)) {
				const requestUrl = event.request.url;
				const files = (sj.config && sj.config.files) || {};
				const internalAssets = [files.all, files.sync, files.wasm].filter(Boolean);

				const isInternal = internalAssets.some(assetPath => {
					try { return requestUrl.includes(assetPath.split("?")[0]); }
					catch { return false; }
				});

				if (isInternal) {
					return await fetch(event.request);
				}

				return await sj.fetch(event);
			}
		} catch (e) {
			console.error("[frosted] Scramjet SW fetch error:", e);
		}

		try {
			if (uv.route(event)) {
				return await uv.fetch(event);
			}
		} catch (e) {
			console.error("[frosted] UV SW fetch error:", e);
		}

		try {
			return await fetch(event.request);
		} catch (error) {
			console.warn("[frosted] SW network fallback failed:", event.request.url, error);
			return Response.error();
		}
	})());
});

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
