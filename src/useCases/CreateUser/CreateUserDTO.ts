interface ICreateUserRequestDTO {
  name: string;
  email: string;
  cpf: string;
  is_deliveryman: boolean;
  password: string;
  password_confirmation: string;
}
export { ICreateUserRequestDTO }
