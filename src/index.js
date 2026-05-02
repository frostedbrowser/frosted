import { createServer } from "node:http";
import { createServer as createSecureServer } from "node:https";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "url";
import path from "node:path";
import { hostname } from "node:os";
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const publicPath = fileURLToPath(new URL("../public/", import.meta.url));
const adblockerEsmPath = fileURLToPath(
	new URL("../node_modules/@ghostery/adblocker/dist/esm/", import.meta.url)
);

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
	root: path.join(publicPath, "scram"),
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

fastify.register(fastifyStatic, {
	root: adblockerEsmPath,
	prefix: "/vendor/adblocker/",
	decorateReply: false,
});

// Register the app's root static files last so prefixed assets
// like /scram/* and /baremux/* are not shadowed by the public wildcard route.
fastify.register(fastifyStatic, {
	root: publicPath,
	decorateReply: true,
});

fastify.post("/api/ai", async (request, reply) => {
	return reply.code(410).send({
		error: "AI backend is disabled on this deployment.",
	});
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