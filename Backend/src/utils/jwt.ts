import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(payload: object, expiresIn: SignOptions['expiresIn'] = '1d') {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken<T>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
