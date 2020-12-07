import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Delivery from '../models/Delivery';

interface Request {
  delivery_id: string;
  deliveryman_id: string;
  recipient: string;
  product: string;
  address: string;
  postal_code: string;
  neighborhood: string;
  city: string;
  state: string;
}

class UpdateDeliveryService {
  public async execute({
    delivery_id,
    deliveryman_id,
    recipient,
    product,
    address,
    postal_code,
    neighborhood,
    city,
    state,
  }: Request): Promise<Delivery> {
    const deliveryRepository = getRepository(Delivery);
    const delivery = await deliveryRepository.findOne(delivery_id);
    if (!delivery) {
      throw new AppError('Delivery not found');
    }

    delivery.deliveryman_id = deliveryman_id;
    delivery.recipient = recipient;
    delivery.product = product;
    delivery.address = address;
    delivery.postal_code = postal_code;
    delivery.neighborhood = neighborhood;
    delivery.city = city;
    delivery.state = state;

    await deliveryRepository.save(delivery);

    return delivery;
  }
}

export default UpdateDeliveryService;
