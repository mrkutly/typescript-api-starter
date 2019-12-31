import { Response, NextFunction } from "express";
import { HTTPClientError, HTTP404Error } from "../utils/httpErrors";
import Logger from '../utils/Logger';

export const notFoundError = (): void => {
  throw new HTTP404Error("Method not found.");
};

export const clientError = (error: Error, res: Response, next: NextFunction): void => {
  if (error instanceof HTTPClientError) {
    Logger.warn(`api.request.error.client - ${error}`);
    res.status(error.statusCode).json({ error: error.message });
  } else {
    next(error);
  }
};

export const serverError = (error: Error, res: Response, next: NextFunction): void => {
  Logger.warn(`api.request.error.server - ${error}`);
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({ error: "Internal Server Error" });
  } else {
    res.status(500).json(error.stack);
  }
};