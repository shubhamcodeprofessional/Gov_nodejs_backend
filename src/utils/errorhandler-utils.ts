import { FastifyReply } from "fastify";

export const handleError = (error: any, reply: FastifyReply) => {
    if (error.name === "SequelizeUniqueConstraintError") {
        const field = error.errors[0].path;
        return reply.status(400).send({ error: `${field} already in use!` });
    }
    console.error(error);
    reply.status(500).send({ message: "Internal Server Error", error });
};