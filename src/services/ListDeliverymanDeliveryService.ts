import { getRepository, IsNull, Like, Not } from 'typeorm';
import { Delivery } from '../entities/Delivery';

interface Request {
  deliveryman_id: string;
  neighborhood?: string;
}

class ListDeliverymanDeliveryService {
  public async execute({
    deliveryman_id,
    neighborhood,
  }: Request): Promise<Delivery[]> {
    const getDelivery = getRepository(Delivery);

    const deliveries = await getDelivery.find({
      where: {
        deliveryman_id,
        canceled_at: IsNull(),
        end_date: IsNull(),
        neighborhood: neighborhood ? Like(`%${neighborhood}%`) : Not(IsNull()),
      },
    });

    return deliveries;
  }
}

export { ListDeliverymanDeliveryService };
