import { Router, Request, Response, NextFunction } from 'express';

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
  middleware.forEach(func => func(router));
};

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
  routes.forEach(route => {
    const { method, path, handler } = route;
    /**
     * this translates to 
     * router.get('/', (req, res) => res.send('hello')) 
     */
    (router as any)[method](path, handler);
  });
};