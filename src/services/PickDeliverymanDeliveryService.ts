import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppError from '../errors/AppError';
import Delivery from '../models/Delivery';

interface Request {
  deliveryman_id: string;
  delivery_id: string;
  start_date: string;
}

class UpdateDeliverymanDeliveryService {
  public async execute({
    deliveryman_id,
    delivery_id,
    start_date,
  }: Request): Promise<Delivery> {
    const deliveryRepository = getRepository(Delivery);
    const delivery = await deliveryRepository.findOne(delivery_id);
    if (!delivery) {
      throw new AppError('Delivery not found');
    }
    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new AppError('You cannot picks up another delivery man delivery.');
    }

    delivery.start_date = parseISO(start_date);

    await deliveryRepository.save(delivery);

    return delivery;
  }
}

export default UpdateDeliverymanDeliveryService;
