import { User } from './services/user/entity';

/** 
 * anything that will be passed between middlewares via the request object
 * should be added here
 * */
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}