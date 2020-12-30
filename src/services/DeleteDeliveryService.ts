import { getRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { Delivery } from '../entities/Delivery';

class DeleteDeliveryService {
  public async execute(delivery_id: string): Promise<void> {
    const deliveryRepository = getRepository(Delivery);
    const delivery = await deliveryRepository.findOne(delivery_id);
    if (!delivery) {
      throw new AppError('Delivery not found');
    }

    await deliveryRepository.delete(delivery_id);
  }
}

export { DeleteDeliveryService };
