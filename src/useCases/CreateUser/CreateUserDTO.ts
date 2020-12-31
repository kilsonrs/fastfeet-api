interface ICreateUserDTO {
  name: string;
  cpf: string;
  email: string;
  is_deliveryman: boolean;
  password: string;
  password_confirmation: string;
}
export { ICreateUserDTO }
