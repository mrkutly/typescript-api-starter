import http from "http";
import express from "express";
import { createConnection } from 'typeorm';
import { applyMiddleware, applyRoutes } from './utils';
import Logger from './utils/Logger';
import middleware from './middleware';
import routes from './services';
import errorHandlers from "./middleware/errorHandlers";

process.on("uncaughtException", (e) => {
  Logger.error(e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  Logger.error(JSON.stringify(e, null, 2));
  process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;

async function startServer(): Promise<void> {
  await createConnection();

  const server = http.createServer(router);
  server.listen(PORT, () =>
    Logger.info(`Server is running on port ${PORT}...`)
  );
}

startServer();