import { IDeliveryDTO } from '../../dtos/IDeliveryDTO';
import { Delivery } from '../../entities/Delivery';
import { IDeliveryRepository } from '../IDeliveryRepository';

class FakeDeliveryRepository implements IDeliveryRepository {
  private deliveries: Delivery[] = [];

  async create({
    deliveryman_id,
    recipient_id,
    package_name,
    address,
    postal_code,
    neighborhood,
    city,
    state,
  }: IDeliveryDTO): Promise<Delivery> {
    const delivery = new Delivery();
    Object.assign(delivery, {
      deliveryman_id,
      recipient_id,
      package_name,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    });
    this.deliveries.push(delivery);
    return delivery;
  }
}

export { FakeDeliveryRepository };
