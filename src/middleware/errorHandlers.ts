import { Request, Response, NextFunction, Router } from "express";
import * as ErrorHandler from "../utils/ErrorHandler";

const handle404Error = (router: Router): void => {
  router.use((req: Request, res: Response): void => {
    ErrorHandler.notFoundError();
  });
};

const handleClientError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    ErrorHandler.clientError(err, res, next);
  });
};

const handleServerError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    ErrorHandler.serverError(err, res, next);
  });
};

export default [handle404Error, handleClientError, handleServerError];