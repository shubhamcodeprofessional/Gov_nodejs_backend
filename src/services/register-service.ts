import RegisterModel from "../models/register-model";
import { RegisterInterface } from "../interfaces/register-interface";
import logger from  '../plugins/logger-plugin';

export async function RegisterUser(userData: RegisterInterface) {
    logger.info("Starting register service");
    try {
        const data = { ...userData};
        const newUser = await RegisterModel.create(data);
        logger.info("User registered successfully", { userRegisterId: newUser.userRegisterId});
        return newUser;
    } catch (error) {
        logger.error("Error in registering user", { error: ( error as Error).message });
        throw error;
    }
}

