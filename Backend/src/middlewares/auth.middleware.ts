import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import HttpException from '../exceptions/HttpException';

export interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export function authenticate(req: AuthRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new HttpException(401, 'No token provided'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken<{ userId: string; role: string }>(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(new HttpException(401, 'Invalid token'));
  }
}
