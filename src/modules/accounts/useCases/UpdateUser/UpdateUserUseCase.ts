import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(data: IUpdateUserDTO): Promise<User> {
    const { id, email, password, password_confirmation } = data;
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new AppError('User not found');
    }

    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email already in use');
    }

    const user = await this.userRepository.save(data);
    if (password && password !== password_confirmation) {
      throw new AppError('Password and password confirmation does not match');
    }
    return user;
  }
}

export { UpdateUserUseCase };
