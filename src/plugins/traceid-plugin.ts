import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import { generateCustomUUID } from '../utils/traceid-utils';

const traceIdHook = fp(function(fastify: FastifyInstance, opts: any, done: (error?: Error) => void) {
  // Ensure hooks are registered correctly
  fastify.addHook('onRequest', (request: FastifyRequest, reply: FastifyReply, next) => {
    (request as any).traceId = generateCustomUUID();
    next();
  });

  fastify.addHook('onSend', (request: FastifyRequest, reply: FastifyReply, payload, done) => {
    const traceId = (request as any).traceId;
    reply.header('x-trace-id', traceId);
    done(null, payload);
  });

  done();
});

export default traceIdHook;