import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../services/user/entity';

dotenv.config();

interface UserToken {
  userId: number;
};

export const makeToken = (user: User): string => {
  return jwt.sign({ userId: user.id }, process.env.APP_SECRET as Secret, { expiresIn: '2 days' });
};

export const parseToken = (token: string): UserToken => {
  try {
    const parsed = jwt.verify(token, process.env.APP_SECRET as Secret);
    return parsed as UserToken;
  } catch (err) {
    return err;
  }
};