function getAppBasePath() {
	try {
		var scopePath = new URL(self.registration?.scope || self.location.href).pathname || "/";
		var normalized = String(scopePath || "/");
		if (!normalized.endsWith("/")) normalized += "/";
		return normalized.replace(/\/{2,}/g, "/");
	} catch {
		return "/";
	}
}

var appBasePath = getAppBasePath();
var scramjetAssetPrefix = `${appBasePath}scram/`.replace(/\/{2,}/g, "/");
var uvAssetPrefix = `${appBasePath}uv/`.replace(/\/{2,}/g, "/");
var defaultUvServicePrefix = `${uvAssetPrefix}service/`.replace(/\/{2,}/g, "/");
var bareMuxAssetPrefix = `${appBasePath}baremux/`.replace(/\/{2,}/g, "/");

importScripts(`${scramjetAssetPrefix}scramjet_bundled.js?v=33`);
console.log(
	"%c[frosted]%c service worker v33 starting...",
	"background-color: #e2f9e2; color: #0a5c0a; padding: 4px 6px; border-radius: 4px; font-weight: bold; font-family: monospace; font-size: 0.9em;",
	""
);

importScripts(`${uvAssetPrefix}uv.bundle.js?v=33`);
importScripts(`${uvAssetPrefix}uv.config.js?v=33`);
importScripts(`${bareMuxAssetPrefix}index.js?v=5`);
self.Ultraviolet.BareClient = self.BareMux.BareClient;
importScripts(`${uvAssetPrefix}uv.sw.js?v=33`);

const uv = new self.UVServiceWorker();

const SEED_CONFIG = {
	prefix: scramjetAssetPrefix,
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
		all: `${scramjetAssetPrefix}scramjet_bundled.js`,
		wasm: `${scramjetAssetPrefix}scramjet.wasm`
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

		const scramjetPrefix = SEED_CONFIG?.prefix || scramjetAssetPrefix;
		const activeUvServicePrefix = self.__uv$config?.prefix || defaultUvServicePrefix;

		if (pathStartsWith(url.pathname, scramjetPrefix)) {
			const filename = url.pathname.split("/").pop();
			if (filename.endsWith(".js") || filename.endsWith(".wasm") || filename.endsWith(".mjs") || filename === "") {
				return true;
			}
			if (url.pathname === scramjetPrefix || url.pathname === scramjetPrefix + "/") {
				return true;
			}
			return false;
		}
		if (pathStartsWith(url.pathname, activeUvServicePrefix)) return false;

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
		scramjetInitDone = true;
		console.log("[frosted] Scramjet SW ready (prefix-based routing).");
		return true;
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
			await getScramjet();
			const prefix = SEED_CONFIG.prefix || scramjetAssetPrefix;
			const url = new URL(event.request.url);
			if (url.pathname.startsWith(prefix) && url.pathname !== prefix && url.pathname !== prefix.slice(0, -1)) {
				try {
					const encoded = url.pathname.slice(prefix.length).split("?")[0];
					const decodedUrl = decodeURIComponent(encoded);
					const routedUvPrefix = (self.__uv$config && self.__uv$config.prefix) || defaultUvServicePrefix;
					const uvEncoded = self.Ultraviolet
						? self.Ultraviolet.codec.xor.encode(decodedUrl)
						: encodeURIComponent(decodedUrl);
					const uvUrl = new URL(routedUvPrefix + uvEncoded, self.location.origin);
					const newRequest = new Request(uvUrl.href, {
						method: event.request.method,
						headers: event.request.headers,
						body: ["GET", "HEAD"].includes(event.request.method) ? undefined : event.request.body,
						mode: "same-origin",
						credentials: "omit",
					});
					const fakeEvent = { request: newRequest };
					if (uv.route(fakeEvent)) {
						return await uv.fetch(fakeEvent);
					}
				} catch (e) {
					console.warn("[frosted] Scramjet→UV fallback failed:", e);
				}
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
