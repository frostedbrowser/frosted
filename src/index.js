import { createServer } from "node:http";
import { createServer as createSecureServer } from "node:https";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "url";
import { hostname } from "node:os";
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const publicPath = fileURLToPath(new URL("../public/", import.meta.url));

// Wisp Configuration: Refer to the documentation at https://www.npmjs.com/package/@mercuryworkshop/wisp-js

logging.set_level(logging.NONE);
Object.assign(wisp.options, {
	allow_udp_streams: false,
	hostname_blacklist: [/example\.com/],
	dns_servers: ["1.1.1.3", "1.0.0.3"],
});

const tlsKeyPath = process.env.SCRAMJET_TLS_KEY_PATH;
const tlsCertPath = process.env.SCRAMJET_TLS_CERT_PATH;
let tlsOptions;

if (tlsKeyPath && tlsCertPath) {
	if (existsSync(tlsKeyPath) && existsSync(tlsCertPath)) {
		tlsOptions = {
			key: readFileSync(tlsKeyPath),
			cert: readFileSync(tlsCertPath),
		};

		console.log("Using TLS certificates from", tlsCertPath);
	} else {
		console.warn(
			"SCRAMJET_TLS_* paths were provided but one or both files do not exist. Falling back to HTTP."
		);
	}
}

const fastify = Fastify({
	serverFactory: (handler) => {
		const nodeServer = tlsOptions ? createSecureServer(tlsOptions) : createServer();

		return nodeServer
			.on("request", (req, res) => {
				res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
				res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
				handler(req, res);
			})
			.on("upgrade", (req, socket, head) => {
				if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
				else socket.end();
			});
	},
});

fastify.register(fastifyStatic, {
	root: scramjetPath,
	prefix: "/scram/",
	decorateReply: false,
});

fastify.register(fastifyStatic, {
	root: libcurlPath,
	prefix: "/libcurl/",
	decorateReply: false,
});

fastify.register(fastifyStatic, {
	root: baremuxPath,
	prefix: "/baremux/",
	decorateReply: false,
});

// Register the app's root static files last so prefixed assets
// like /scram/* and /baremux/* are not shadowed by the public wildcard route.
fastify.register(fastifyStatic, {
	root: publicPath,
	decorateReply: true,
});

fastify.post("/api/ai", async (request, reply) => {
	const provider = String(
		process.env.AI_PROVIDER || (process.env.OPENAI_API_KEY ? "openai" : "uncloseai")
	).toLowerCase();
	const prompt = String(request.body?.prompt || "").trim();

	if (!prompt) {
		return reply.code(400).send({ error: "Prompt is required." });
	}

	if (provider === "openai") {
		const apiKey = process.env.OPENAI_API_KEY;
		const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
		if (!apiKey) {
			return reply.code(503).send({
				error: "OpenAI is not configured. Set OPENAI_API_KEY in your server environment.",
			});
		}

		try {
			const response = await fetch("https://api.openai.com/v1/responses", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model,
					input: prompt,
					max_output_tokens: 500,
				}),
			});

			const data = await response.json().catch(() => ({}));
			if (!response.ok) {
				const detail = data?.error?.message || "Upstream AI request failed.";
				return reply.code(response.status).send({ error: detail });
			}

			const text = String(data?.output_text || "").trim();
			if (text) {
				return reply.send({ text });
			}
			return reply.code(502).send({ error: "AI response did not contain text output." });
		} catch (error) {
			const detail = error?.message || "Failed to reach AI provider.";
			return reply.code(502).send({ error: detail });
		}
	}

	const apiKey = process.env.UNCLOSEAI_API_KEY || process.env.OPENAI_API_KEY || "";
	const hermesBase = String(process.env.UNCLOSEAI_HERMES_BASE || "").replace(/\/+$/, "");
	const qwenBase = String(process.env.UNCLOSEAI_QWEN_BASE || "").replace(/\/+$/, "");
	if (!hermesBase && !qwenBase) {
		return reply.code(503).send({
			error:
				"UncloseAI endpoints are not configured. Set UNCLOSEAI_HERMES_BASE/UNCLOSEAI_QWEN_BASE or set AI_PROVIDER=openai with OPENAI_API_KEY.",
		});
	}
	const model = process.env.UNCLOSEAI_MODEL || process.env.OPENAI_MODEL || "auto";
	const requestedMode = String(request.body?.mode || "auto").toLowerCase();
	const looksCodingPrompt =
		/\b(code|coding|program|debug|bug|script|javascript|typescript|python|java|c\+\+|html|css|json|sql)\b/i.test(
			prompt
		);
	const providerBase =
		requestedMode === "qwen"
			? qwenBase || hermesBase
			: requestedMode === "hermes"
				? hermesBase || qwenBase
				: looksCodingPrompt
					? qwenBase || hermesBase
					: hermesBase || qwenBase;

	try {
		const headers = {
			"Content-Type": "application/json",
		};
		if (apiKey) {
			headers.Authorization = `Bearer ${apiKey}`;
		}
		const payload = {
			model,
			messages: [{ role: "user", content: prompt }],
			max_tokens: 500,
		};
		const candidatePaths = ["/chat/completions"];
		let response = null;
		let data = {};
		let lastError = "";
		for (const path of candidatePaths) {
			response = await fetch(`${providerBase}${path}`, {
				method: "POST",
				headers,
				body: JSON.stringify(payload),
			});
			data = await response.json().catch(() => ({}));
			if (response.ok) break;
			lastError = data?.error?.message || `Upstream error (${response.status}) on ${path}`;
		}

		if (!response || !response.ok) {
			const detail = lastError || "Upstream AI request failed.";
			return reply.code(response?.status || 502).send({ error: detail });
		}

		const rawContent = data?.choices?.[0]?.message?.content;
		const text =
			typeof rawContent === "string"
				? rawContent.trim()
				: Array.isArray(rawContent)
					? rawContent
							.map((part) => (typeof part?.text === "string" ? part.text : ""))
							.join("")
							.trim()
					: "";
		if (text) {
			return reply.send({ text });
		}
		return reply.code(502).send({ error: "AI response did not contain text output." });
	} catch (error) {
		const detail =
			error?.cause?.message ||
			error?.message ||
			"Failed to reach AI provider.";
		return reply.code(502).send({ error: detail });
	}
});

fastify.setNotFoundHandler((res, reply) => {
	return reply.code(404).type("text/html").sendFile("404.html");
});

fastify.server.on("listening", () => {
	const address = fastify.server.address();
	const protocol = tlsOptions ? "https" : "http";

	// by default we are listening on 0.0.0.0 (every interface)
	// we just need to list a few
	console.log("Listening on:");
	console.log(`\t${protocol}://localhost:${address.port}`);
	console.log(`\t${protocol}://${hostname()}:${address.port}`);
	console.log(
		`\t${protocol}://${
			address.family === "IPv6" ? `[${address.address}]` : address.address
		}:${address.port}`
	);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
	console.log("SIGTERM signal received: closing HTTP server");
	fastify.close();
	process.exit(0);
}

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

fastify.listen({
	port: port,
	host: "0.0.0.0",
});