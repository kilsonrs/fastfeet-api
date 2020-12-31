import PostgresUserRepository from "../../repositories/implementations/PostgresUserRepository";
import FieldValidatorProvider from "../../shared/providers/FieldValidator/implementations/FieldValidatorProvider";
import BCryptHashProvider from "../../shared/providers/HashProvider/implementations/BCryptHashProvider";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const usersRepository = new PostgresUserRepository()
const hashProvider = new BCryptHashProvider()
const fieldValidator = new FieldValidatorProvider()

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  fieldValidator,
  hashProvider,
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export { createUserUseCase, createUserController }
