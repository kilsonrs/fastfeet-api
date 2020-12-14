import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppError from '../errors/AppError';
import Delivery from '../models/Delivery';

interface Request {
  deliveryman_id: string;
  delivery_id: string;
  end_date: string;
}

class FinalizeDeliverymanDeliveryService {
  public async execute({
    deliveryman_id,
    delivery_id,
    end_date,
  }: Request): Promise<Delivery> {
    const deliveryRepository = getRepository(Delivery);
    const delivery = await deliveryRepository.findOne(delivery_id);
    if (!delivery) {
      throw new AppError('Delivery not found');
    }
    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new AppError(
        'You cannot finalize delivery from another deliveryman.',
      );
    }

    if (delivery.end_date) {
      throw new AppError('You cannot finalize the delivery already delivered.');
    }

    delivery.end_date = parseISO(end_date);

    await deliveryRepository.save(delivery);

    return delivery;
  }
}

export default FinalizeDeliverymanDeliveryService;
