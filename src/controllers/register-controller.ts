import { FastifyRequest, FastifyReply } from "fastify";
import * as RegisterService from "../services/register-service";
import { RegisterInterface } from "../interfaces/register-interface";

export async function RegisterUser(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const registerUser = request.body as RegisterInterface;

    try {
        const newRegisterUsers = await RegisterService.RegisterUser(registerUser);
        reply.status(201).send({
            status_code: 201,
            message: "user Register successfully",
            userRegisterId: newRegisterUsers.userRegisterId
        });
    } catch (error) {
        reply.status(500).send({
            status_code: 500,
            message: "Internal server error",
            error: (error as Error).message
        });
    }
}
