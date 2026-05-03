"use strict";
const stockSW = "sw.js?v=32";
const swReadyTimeoutMs = 2000;
const swControllerTimeoutMs = 2000;

/**
 * List of hostnames that are allowed to run serviceworkers on http://
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/**
 * Global util
 * Used in 404.html and index.html
 */
function withTimeout(promise, timeoutMs, fallbackValue = null) {
	return new Promise((resolve, reject) => {
		let settled = false;
		const timer = setTimeout(() => {
			if (settled) return;
			settled = true;
			resolve(fallbackValue);
		}, timeoutMs);

		Promise.resolve(promise).then(
			(value) => {
				if (settled) return;
				settled = true;
				clearTimeout(timer);
				resolve(value);
			},
			(error) => {
				if (settled) return;
				settled = true;
				clearTimeout(timer);
				reject(error);
			}
		);
	});
}

function getAppBasePath() {
	try {
		var scriptCandidates = [];
		try {
			if (document.currentScript?.src) scriptCandidates.push(String(document.currentScript.src));
		} catch { }
		try {
			var registerScript = document.querySelector("script[src*='register-sw.js']");
			if (registerScript?.src) scriptCandidates.push(String(registerScript.src));
		} catch { }
		try {
			var indexScript = document.querySelector("script[src*='index.js']");
			if (indexScript?.src) scriptCandidates.push(String(indexScript.src));
		} catch { }
		for (var candidate of scriptCandidates) {
			try {
				var parsed = new URL(candidate, window.location.href);
				var pathname = String(parsed.pathname || "/");
				if (!pathname.endsWith("register-sw.js") && !pathname.endsWith("index.js")) continue;
				var fromScript = pathname.replace(/\/[^/]*$/, "/");
				if (!fromScript.startsWith("/")) fromScript = `/${fromScript}`;
				return fromScript.replace(/\/{2,}/g, "/");
			} catch { }
		}
		var path = String(window.location.pathname || "/").replace(/\/[^/]*$/, "/");
		if (!path.startsWith("/")) path = `/${path}`;
		return path.replace(/\/{2,}/g, "/");
	} catch {
		return "/";
	}
}

function createBareMuxPortForServiceWorker() {
	try {
		if (typeof window.SharedWorker !== "function") return null;
		var worker = new SharedWorker(`${getAppBasePath()}baremux/worker.js`, "bare-mux-worker");
		worker.port.start?.();
		return worker.port || null;
	} catch {
		return null;
	}
}

function bindBareMuxServiceWorkerPortBridge() {
	if (typeof navigator === "undefined" || !navigator.serviceWorker) return;
	if (window.__frostedBareMuxPortBridgeBound) return;
	window.__frostedBareMuxPortBridgeBound = true;
	navigator.serviceWorker.addEventListener("message", (event) => {
		var data = event?.data || {};
		if (String(data.type || "") !== "getPort") return;
		var replyPort = data.port;
		if (!replyPort) return;
		try {
			var sharedWorkerPort = createBareMuxPortForServiceWorker();
			if (!sharedWorkerPort) return;
			replyPort.postMessage(sharedWorkerPort, [sharedWorkerPort]);
		} catch { }
	});
}

async function registerSW() {
	if (!navigator.serviceWorker) {
		if (
			location.protocol !== "https:" &&
			!swAllowedHostnames.includes(location.hostname)
		)
			throw new Error("Service workers cannot be registered without https.");

		throw new Error("Your browser doesn't support service workers.");
	}

	const registration = await navigator.serviceWorker.register(`${getAppBasePath()}${stockSW}`);

	try {
		await registration.update();
	} catch (e) { }

	if (registration.waiting) {
		registration.waiting.postMessage({ type: "SKIP_WAITING" });
	}
	if (registration.active) {
		registration.active.postMessage({ type: "SKIP_WAITING" });
	}
	await withTimeout(navigator.serviceWorker.ready, swReadyTimeoutMs, registration);

	if (!navigator.serviceWorker.controller) {
		await withTimeout(new Promise((resolve) => {
			let settled = false;
			const finish = () => {
				if (settled) return;
				settled = true;
				navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
				resolve();
			};
			const onControllerChange = () => finish();
			navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
			setTimeout(finish, swControllerTimeoutMs);
		}), swReadyTimeoutMs + swControllerTimeoutMs, null);
	}

	return registration;
}

if (typeof window !== "undefined") {
	console.log("%c[frosted]%c registration script v31 loaded", "color: #00ffa6; font-weight: bold;", "");
	bindBareMuxServiceWorkerPortBridge();
	window.registerSW = registerSW;
	window.createBareMuxPortForServiceWorker = createBareMuxPortForServiceWorker;
}
