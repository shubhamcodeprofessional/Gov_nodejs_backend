import fastify from 'fastify';
import pino from 'pino';

const server = fastify({
  logger: pino({
    level: 'info', // Log level
    transport: {
      target: 'pino-pretty', // Optional for readable logs
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z'
      }
    }
  })
});

export default server.log;