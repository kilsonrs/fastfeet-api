import { IUsersRepository } from '../../../accounts/repositories/IUsersRepository';
import { Delivery } from '../../entities/Delivery';
import { IDeliveryRepository } from '../../repositories/IDeliveryRepository';

interface IRequest {
  user_id: string;
}

class ListDeliveryUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private deliveryRepository: IDeliveryRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<Delivery[]> {
    const user = await this.usersRepository.findById(user_id);
    if (user.is_deliveryman) {
      const deliveries = await this.deliveryRepository.findByDeliverymanId(
        user_id,
      );
      return deliveries;
    }
    const deliveries = await this.deliveryRepository.list();
    return deliveries;
  }
}

export { ListDeliveryUseCase };
