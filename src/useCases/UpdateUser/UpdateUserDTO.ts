export default interface IUpdateUserDTO {
  id: string;
  name: string;
  email: string;
  is_deliveryman: boolean;
  password: string;
  password_confirmation: string;
}
