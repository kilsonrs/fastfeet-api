import { getRepository, IsNull } from 'typeorm';
import Delivery from '../models/Delivery';

interface Request {
  deliveryman_id: string;
}

class ListDeliverymanDeliveryService {
  public async execute({ deliveryman_id }: Request): Promise<Delivery[]> {
    const getDelivery = getRepository(Delivery);

    const deliveries = await getDelivery.find({
      where: {
        deliveryman_id,
        canceled_at: IsNull(),
      },
    });

    return deliveries;
  }
}

export default ListDeliverymanDeliveryService;
