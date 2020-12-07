import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';

async function ensureAdminOnly(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const getUsers = getRepository(User);
  const userId = request.user.id;
  const user = await getUsers.findOne(userId);
  if (!user || user.deliveryman) {
    throw new AppError('User not found or without permission to access.');
  }
  return next();
}

export default ensureAdminOnly;
