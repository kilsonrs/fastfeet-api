import PostgresUserRepository from "../../repositories/implementations/PostgresUserRepository";
import BCryptHashProvider from "../../shared/providers/HashProvider/implementations/BCryptHashProvider";
import { CreateUserController } from "./CreateUserController";
import CreateUserUseCase from "./CreateUserUseCase";

const usersRepository = new PostgresUserRepository()
const hashProvider = new BCryptHashProvider()

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  hashProvider,
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export { createUserUseCase, createUserController }
