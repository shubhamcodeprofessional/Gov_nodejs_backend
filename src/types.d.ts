import { FastifyRequest } from 'fastify';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends FastifyRequest {
  user?: JwtPayload | string; 
}
