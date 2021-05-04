import { IDeliveryDTO } from '../../dtos/IDeliveryDTO';
import { IFindAllInNeighborhoodFromDeliverymanDTO } from '../../dtos/IFindAllInNeighborhoodFromDeliverymanDTO';
import { Delivery } from '../../entities/Delivery';
import { IDeliveryRepository } from '../IDeliveryRepository';

class FakeDeliveryRepository implements IDeliveryRepository {
  private deliveries: Delivery[] = [];

  async findAllInNeighborhoodFromDeliveryman({
    deliveryman_id,
  }: IFindAllInNeighborhoodFromDeliverymanDTO): Promise<Delivery[]> {
    const deliveries = this.deliveries.filter(
      delivery => delivery.deliveryman_id === deliveryman_id,
    );
    return deliveries;
  }

  async list(): Promise<Delivery[]> {
    return this.deliveries;
  }

  async create({
    deliveryman_id,
    recipient_id,
    package_name,
  }: IDeliveryDTO): Promise<Delivery> {
    const delivery = new Delivery();
    Object.assign(delivery, {
      deliveryman_id,
      recipient_id,
      package_name,
    });
    this.deliveries.push(delivery);
    return delivery;
  }
}

export { FakeDeliveryRepository };
