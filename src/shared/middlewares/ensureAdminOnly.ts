import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../modules/accounts/entities/User';
import { AppError } from '../errors/AppError';

async function ensureAdminOnly(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const getUsers = getRepository(User);
  const userId = request.user.id;
  console.log(request.user);
  const user = await getUsers.findOne(userId);
  console.log(user);
  if (!user) {
    throw new AppError('User not found.');
  }
  if (user.is_deliveryman) {
    throw new AppError('User without permission to access.', 401);
  }
  return next();
}

export { ensureAdminOnly };
