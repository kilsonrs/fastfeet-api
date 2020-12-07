import { getRepository } from 'typeorm';
import Deliveries from '../models/Deliveries';

class ListDeliveryService {
  public async execute(): Promise<Deliveries[]> {
    const getDelivery = getRepository(Deliveries);

    const deliveries = getDelivery.find();

    return deliveries;
  }
}

export default ListDeliveryService;
