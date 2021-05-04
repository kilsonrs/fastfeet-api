import { getRepository, Repository } from 'typeorm';

import { IDeliveryDTO } from '../../dtos/IDeliveryDTO';
import { IFindAllInNeighborhoodFromDeliverymanDTO } from '../../dtos/IFindAllInNeighborhoodFromDeliverymanDTO';
import { Delivery } from '../../entities/Delivery';
import { IDeliveryRepository } from '../IDeliveryRepository';

class DeliveryRepository implements IDeliveryRepository {
  private repository: Repository<Delivery>;

  constructor() {
    this.repository = getRepository(Delivery);
  }

  async findAllInNeighborhoodFromDeliveryman({
    deliveryman_id,
    neighborhood,
  }: IFindAllInNeighborhoodFromDeliverymanDTO): Promise<Delivery[]> {
    const filterByNeighborhoodIfProvided = {
      neighborhood: `%${neighborhood || ''}%`,
    };

    const deliveries = await this.repository.find({
      where: qb => {
        qb.where({ deliveryman_id }).andWhere(
          'Delivery_recipient.neighborhood like :neighborhood',
          filterByNeighborhoodIfProvided,
        );
      },
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
