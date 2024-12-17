import fastify from "fastify";
import cors from "@fastify/cors";
import { sequelize, checkDatabaseConnection } from "./plugins/sequelize-plugin";
import formBodyPlugin from "@fastify/formbody";
import registerRoutes from "./routes";
import traceIdHook from './plugins/traceid-plugin'; // Import the tracing plugin
import log from './plugins/logger-plugin';
const app = fastify({});

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-trace-id"],
});

app.register(traceIdHook);

app.get('/health-check', async (request, reply) => {
  try {
    log.info(`Route Trace ID: ${(request as any).traceId}`);
    const dbStatus = await checkDatabaseConnection();
    if (dbStatus.connected) {
      reply.send({ status: 'ok', database: dbStatus.message });
    } else {
      reply.status(500).send({ status: 'error', message: dbStatus.message });
    }
  } catch (err) {
    reply.status(500).send({ status: 'error', message: 'An unknown error occurred' });
  }
});
app.register(registerRoutes);
app.register(formBodyPlugin);
let port = Number(process.env.APP_PORT) || 4000;
let env = process.env.ENV || "not defined";

const start = async () => {
  try {
    const dbStatus = await checkDatabaseConnection();
    if (!dbStatus.connected) {
      log.error(dbStatus)
      throw new Error(dbStatus.message);
    }

    await sequelize.sync({});
    await app.listen({ port: port, host: "0.0.0.0" });
    log.info(`app listening on port ${port}, Environment : ${env}`);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};

start();
export default app;