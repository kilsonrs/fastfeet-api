import { IDeliveryDTO } from '../../dtos/IDeliveryDTO';
import { Delivery } from '../../entities/Delivery';
import { IDeliveryRepository } from '../IDeliveryRepository';

class FakeDeliveryRepository implements IDeliveryRepository {
  private deliveries: Delivery[] = [];

  async findByDeliverymanId(user_id: string): Promise<Delivery[]> {
    return this.deliveries.filter(
      delivery => delivery.deliveryman_id === user_id,
    );
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
