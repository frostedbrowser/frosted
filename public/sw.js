importScripts("scram/scramjet.all.js?v=32");
console.log("%c[frosted]%c service worker v32 starting...", "color: #00ffa6; font-weight: bold;", "");

importScripts("uv/uv.bundle.js?v=32");
importScripts("uv/uv.config.js?v=32");
importScripts("uv/uv.sw.js?v=32");

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
		setrealmfn: "$scramjet$setrealm",
		pushsourcemapfn: "$scramjet$pushsourcemap",
		trysetfn: "$scramjet$tryset",
		templocid: "$scramjet$temploc",
		tempunusedid: "$scramjet$tempunused"
	},
	files: {
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js"
	},
	wasm: "/scram/scramjet.wasm.wasm",
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

async function ensureScramjetDB() {
	try {
		const db = await new Promise((resolve, reject) => {
			const req = indexedDB.open("$scramjet_v32");
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
			const req = indexedDB.deleteDatabase("$scramjet_v32");
			req.onsuccess = resolve;
			req.onerror = resolve;
			req.onblocked = resolve;
		});

		const newDb = await new Promise((resolve, reject) => {
			const req = indexedDB.open("$scramjet_v32", 1);
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
			console.log("[frosted] SW: created $scramjet_v32 DB with stores and seed config.");
		} catch (e) { }
		newDb.close();
	} catch (e) {
	}
}

async function getTransport() {
	return new Promise((resolve) => {
		const channel = new MessageChannel();
		channel.port1.onmessage = (event) => {
			if (event.data) resolve(event.data);
		};
		self.clients.matchAll().then((clients) => {
			if (!clients || clients.length === 0) {
				resolve(null);
				return;
			}
			for (const client of clients) {
				client.postMessage({ type: "getPort", port: channel.port2 }, [channel.port2]);
			}
		});
		setTimeout(() => resolve(null), 5000);
	});
}

async function getScramjet() {
	if (scramjetInitDone) return scramjet;
	if (scramjetInitPromise) return scramjetInitPromise;

	scramjetInitPromise = (async () => {
		await ensureScramjetDB();

		try {
			scramjet = new ScramjetServiceWorker();
		} catch (e) {
			console.error("[frosted] ScramjetServiceWorker instantiation failed:", e);
			scramjetInitDone = true;
			return null;
		}

		try {
			await scramjet.loadConfig();
		} catch (e) { }

		if (!scramjet.config || !scramjet.config.prefix) {
			scramjet.config = SEED_CONFIG;
		}

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
			}
		});
	}
});

self.addEventListener("fetch", (event) => {
	event.respondWith((async () => {
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

		return fetch(event.request);
	})());
});

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
