import { FastifyInstance } from "fastify";
import registerRoutes from "./register-routes";

const basePrefix = "api/gov";

export default async function (app: FastifyInstance) {
    app.register(registerRoutes, { prefix: `${basePrefix}/register`})
}