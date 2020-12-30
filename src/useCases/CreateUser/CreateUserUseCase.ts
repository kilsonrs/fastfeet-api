import { AppError } from "../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {
  }
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)
    if (userAlreadyExists) {
      throw new AppError('User')
    }
  }
}

export { CreateUserUseCase };
