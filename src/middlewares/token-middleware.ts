import { FastifyRequest, FastifyReply } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateCustomUUID } from '../utils/traceid-utils';


interface CustomRequest extends FastifyRequest {
  user?: JwtPayload | string;
}

export const verifyToken = async (request: CustomRequest, reply: FastifyReply) => {
  const traceId = generateCustomUUID();
  const authHeader = request.headers?.authorization;
  const logger = request.log;

  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];

    try {
      const API_SECRET = process.env.API_SECRET;

      const decodedUser = jwt.verify(token, API_SECRET as jwt.Secret);
      request.user = decodedUser;
      logger.info(`Token verified successfully, traceId: ${traceId}`);
      return reply.status(200).send({
        status: 'Success',
        traceId,
        message: 'Token verified successfully',
      });
    } catch (error) {
      logger.error(`Unauthorized - Invalid token, traceId: ${traceId}`, error);
      return reply.status(401).send({
        status: 'Failed',
        traceId,
        errorMessage: 'Unauthorized - Invalid token',
      });
    }
  } else {
    logger.warn(`Unauthorized - Token not found, traceId: ${traceId}`);
    return reply.status(401).send({
      status: 'Failed',
      traceId,
      message: 'Unauthorized - Token not found',
    });
  }
};

export const decodeToken = async (token: string, request: FastifyRequest) => {
  const logger = request.log;

  try {
    const decoded = jwt.decode(token) as JwtPayload;
    logger.info('Token decoded successfully');
    return decoded;
  } catch (error) {
    logger.error('Token decoding error:', (error as any).message);
    throw new Error('Token decoding failed');
  }
};