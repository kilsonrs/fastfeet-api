import { getRepository, Between } from 'typeorm';
import { startOfDay, endOfDay, isBefore, addHours, isAfter } from 'date-fns';
import AppError from '../errors/AppError';
import Delivery from '../models/Delivery';

interface Request {
  deliveryman_id: string;
  delivery_id: string;
}

class UpdateDeliverymanDeliveryService {
  public async execute({
    deliveryman_id,
    delivery_id,
  }: Request): Promise<Delivery> {
    const deliveryRepository = getRepository(Delivery);
    const delivery = await deliveryRepository.findOne(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found');
    }

    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new AppError(
        'You cannot withdraw an order from another delivery man.',
      );
    }

    if (delivery.start_date) {
      throw new AppError('Order already picked up for delivery.');
    }

    const startDate = new Date();

    const orderPickupTimeStarts = addHours(startOfDay(startDate), 8);
    const orderPickupTimeEnds = addHours(startOfDay(startDate), 12);

    const checkOrderPickupTime =
      isAfter(startDate, orderPickupTimeStarts) &&
      isBefore(startDate, orderPickupTimeEnds);

    if (!checkOrderPickupTime) {
      throw new AppError('You are not in the order pickup time');
    }

    const checkDeliveriesQuantity = await deliveryRepository.count({
      where: {
        deliveryman_id,
        start_date: Between(startOfDay(startDate), endOfDay(startDate)),
      },
    });

    if (checkDeliveriesQuantity >= 5) {
      throw new AppError('You can only take five packs a day.');
    }

    delivery.start_date = startDate;

    await deliveryRepository.save(delivery);

    return delivery;
  }
}

export default UpdateDeliverymanDeliveryService;
