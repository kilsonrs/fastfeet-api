import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import { AppError } from '../errors/AppError';

interface TokenPayload {
  iap: number;
  exp: number;
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub: user_id } = decoded as TokenPayload;
    console.log(decoded);

    request.user = {
      id: user_id,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

export { ensureAuthenticated };
