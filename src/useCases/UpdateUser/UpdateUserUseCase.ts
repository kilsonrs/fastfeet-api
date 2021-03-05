import IUpdateUserDTO from './UpdateUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';
import User from '../../entities/User';
import AppError from '../../shared/errors/AppError';

class UpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

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

export default UpdateUserUseCase;
