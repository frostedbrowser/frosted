importScripts("/scram/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

function shouldBypassScramjet(request) {
	try {
		const url = new URL(request.url);
		const host = url.hostname.toLowerCase();
		const path = url.pathname.toLowerCase();

		// Common OpenAI-compatible API paths used by chat/model/tts flows.
		if (
			path.startsWith("/v1/chat/completions") ||
			path.startsWith("/v1/models") ||
			path.startsWith("/v1/responses") ||
			path.startsWith("/v1/audio/speech")
		) {
			return true;
		}
	} catch {
		// no-op; default routing will be used.
	}
	return false;
}

async function handleRequest(event) {
	if (shouldBypassScramjet(event.request)) {
		return fetch(event.request);
	}

	await scramjet.loadConfig();
	if (scramjet.route(event)) {
		return scramjet.fetch(event);
	}
	return fetch(event.request);
}

self.addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event));
});
