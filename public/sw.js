importScripts("/scram/scramjet.all.js");
// trying to hard block the new adblock.turtlecute.org scripts (fakeads)
const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();
const hardBlockedAdKeywords = [
	"adblock.turtlecute.org/js/pagead.js",
	"adblock.turtlecute.org/js/widget/ads.js",
	"https%3a%2f%2fadblock.turtlecute.org%2fjs%2fpagead.js",
	"https%3a%2f%2fadblock.turtlecute.org%2fjs%2fwidget%2fads.js",
];

function matchesHardBlockedKeyword(rawValue) {
	const source = String(rawValue || "").trim();
	if (!source) return false;
	const variants = [source.toLowerCase()];
	try {
		const once = decodeURIComponent(source);
		variants.push(String(once || "").toLowerCase());
		try {
			const twice = decodeURIComponent(once);
			variants.push(String(twice || "").toLowerCase());
		} catch {}
	} catch {}
	return variants.some((value) =>
		hardBlockedAdKeywords.some((keyword) => value.includes(keyword))
	);
}

function isHardBlockedAdRequest(request) {
	try {
		const rawUrl = String(request?.url || "");
		if (matchesHardBlockedKeyword(rawUrl)) return true;
		const parsed = new URL(rawUrl);
		if (matchesHardBlockedKeyword(parsed.href)) return true;
		if (matchesHardBlockedKeyword(parsed.pathname)) return true;
		if (matchesHardBlockedKeyword(parsed.search)) return true;
	} catch {}
	return false;
}

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
	if (isHardBlockedAdRequest(event.request)) {
		return new Response("Blocked by Frosted adblock💖", {
			status: 403,
			statusText: "Blocked by Frosted adblock",
			headers: {
				"content-type": "text/plain; charset=utf-8",
				"cache-control": "no-store",
			},
		});
	}

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