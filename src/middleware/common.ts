import { Router, Response, Request, NextFunction } from 'express';
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import Logger from '../utils/Logger';

export const handleCors = (router: Router): void => {
  router.use(cors({ credentials: true, origin: true }));
};

export const handleBodyParsing = (router: Router): void => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router): void => {
  router.use(compression());
};

export const logRequest = (router: Router): void => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    Logger.info(`api.request - ${req.method} ${req.path}`);
    next();
  });
};