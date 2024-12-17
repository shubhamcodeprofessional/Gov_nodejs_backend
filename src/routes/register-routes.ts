import { FastifyInstance } from "fastify";
import { RegisterUser } from "../controllers/register-controller";

async function registerRoutes(fastify: FastifyInstance) {
    
    fastify.post('/', RegisterUser);
}

export default registerRoutes;