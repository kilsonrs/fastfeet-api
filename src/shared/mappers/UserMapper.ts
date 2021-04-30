import { User } from '../../modules/accounts/entities/User';

class UserMapper {
  toDTO(
    user: User,
  ): Omit<User, 'password' | 'cpf' | 'created_at' | 'updated_at'> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      is_deliveryman: user.is_deliveryman,
    };
  }
}

export { UserMapper };
