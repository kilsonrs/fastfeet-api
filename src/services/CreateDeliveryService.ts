import { getRepository } from 'typeorm';
import Delivery from '../models/Deliveries';

interface Request {
  deliveryman_id: string;
  recipient: string;
  product: string;
  address: string;
  postal_code: string;
  neighborhood: string;
  city: string;
  state: string;
}

class CreateDeliveryService {
  public async execute({
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
    const newDelivery = {
      deliveryman_id,
      recipient,
      product,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    };
    const delivery = deliveryRepository.create(newDelivery);

    await deliveryRepository.save(delivery);

    return delivery;
  }
}

export default CreateDeliveryService;
