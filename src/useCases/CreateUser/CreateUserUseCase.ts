import { AppError } from "../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "./CreateUserDTO";
import { IFieldValidatorProvider } from "../../shared/providers/FieldValidator/IFieldValidatorProvider";

class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private fieldValidator: IFieldValidatorProvider,
    private hashProvider: IHashProvider
  ) {
  }
  async execute(data: ICreateUserDTO) {
    const noDataProvided = Object.keys(data).length === 0
    if (noDataProvided) {
      throw new AppError('Required data not provided')
    }

    const { email, cpf, password, password_confirmation } = data

    if (password !== password_confirmation) {
      throw new AppError('Password and password_confirmation does not match')
    }

    const isCpfValid = this.fieldValidator.isCpf(cpf)
    if (!isCpfValid) {
      throw new AppError('Invalid CPF provided')
    }

    const cpfAlreadyExists = await this.usersRepository.findByCpf(cpf)
    if (cpfAlreadyExists) {
      throw new AppError('An user already exists with this cpf.', 403)
    }

    const isEmailValid = this.fieldValidator.isEmail(email)
    if (!isEmailValid) {
      throw new AppError('Invalid E-mail provided')
    }

    const emailAlreadyExists = await this.usersRepository.findByEmail(email)
    if (emailAlreadyExists) {
      throw new AppError('An user already exists with this email.', 403)
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = {
      ...data,
      password: hashedPassword
    }

    const newUser = await this.usersRepository.create(user)
    return newUser
  }
}

export { CreateUserUseCase };
