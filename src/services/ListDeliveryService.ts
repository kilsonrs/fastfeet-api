import { getRepository } from 'typeorm';
import Delivery from '../models/Delivery';

class ListDeliveryService {
  public async execute(): Promise<Delivery[]> {
    const getDelivery = getRepository(Delivery);

    const deliveries = getDelivery.find();

    return deliveries;
  }
}

export default ListDeliveryService;