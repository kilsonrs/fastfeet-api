import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  cpf: string;
  deliveryman: boolean;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    cpf,
    deliveryman,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const checkUserExtists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExtists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      deliveryman,
    });
    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
