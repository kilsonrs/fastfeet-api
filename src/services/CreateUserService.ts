import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { AppError } from '../errors/AppError';
import { User } from '../entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
  cpf: string;
  is_deliveryman: boolean;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    cpf,
    is_deliveryman,
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
      is_deliveryman,
    });
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
