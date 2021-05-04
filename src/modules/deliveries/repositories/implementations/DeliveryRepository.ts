import { getRepository, Repository } from 'typeorm';

import { IDeliveryDTO } from '../../dtos/IDeliveryDTO';
import { Delivery } from '../../entities/Delivery';
import { IDeliveryRepository } from '../IDeliveryRepository';

class DeliveryRepository implements IDeliveryRepository {
  private repository: Repository<Delivery>;

  constructor() {
    this.repository = getRepository(Delivery);
  }

  async findByDeliverymanId(user_id: string): Promise<Delivery[]> {
    const deliveries = await this.repository.find({
      where: { deliveryman_id: user_id },
    });
    return deliveries;
  }

  async list(): Promise<Delivery[]> {
    const deliveries = await this.repository.find();
    return deliveries;
  }

  async create({
    deliveryman_id,
    recipient_id,
    package_name,
  }: IDeliveryDTO): Promise<Delivery> {
    const delivery = await this.repository.create({
      deliveryman_id,
      recipient_id,
      package_name,
    });

    await this.repository.save(delivery);

    return delivery;
  }
}

export { DeliveryRepository };
