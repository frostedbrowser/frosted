import Fastify from "fastify";
const fastify = Fastify();
fastify.get("/check", (req, reply) => {
	reply.code(200).send("OK");
});
fastify.listen({ port: 8082, host: "127.0.0.1" }).then(() => {
	console.log("Listening on 8082");
});
