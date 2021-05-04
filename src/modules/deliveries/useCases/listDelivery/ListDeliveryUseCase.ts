import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../../accounts/repositories/IUsersRepository';
import { Delivery } from '../../entities/Delivery';
import { IDeliveryRepository } from '../../repositories/IDeliveryRepository';

interface IRequest {
  user_id: string;
  neighborhood?: string;
}

@injectable()
class ListDeliveryUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  async execute({ user_id, neighborhood }: IRequest): Promise<Delivery[]> {
    const user = await this.usersRepository.findById(user_id);

    if (user.is_deliveryman) {
      const deliverymanDeliveries = await this.deliveryRepository.findAllInNeighborhoodFromDeliveryman(
        {
          deliveryman_id: user_id,
          neighborhood,
        },
      );
      return deliverymanDeliveries;
    }

    const allDeliveries = await this.deliveryRepository.list();
    return allDeliveries;
  }
}

export { ListDeliveryUseCase };
