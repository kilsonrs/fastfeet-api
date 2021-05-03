import { AppError } from '../../../../shared/errors/AppError';
import { IDeliveryDTO } from '../../dtos/IDeliveryDTO';
import { Delivery } from '../../entities/Delivery';
import { IDeliveryRepository } from '../../repositories/IDeliveryRepository';

class CreateDeliveryUseCase {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  async execute({
    deliveryman_id,
    recipient_id,
    package_name,
    address,
    postal_code,
    neighborhood,
    city,
    state,
  }: IDeliveryDTO): Promise<Delivery> {
    if (!deliveryman_id) {
      throw new AppError('Deliveryman must be provided');
    }
    if (!recipient_id) {
      throw new AppError('Recipient must be provided');
    }
    if (!package_name) {
      throw new AppError('Package name must be provided');
    }
    const delivery = await this.deliveryRepository.create({
      deliveryman_id,
      recipient_id,
      package_name,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    });
    return delivery;
  }
}

export { CreateDeliveryUseCase };
