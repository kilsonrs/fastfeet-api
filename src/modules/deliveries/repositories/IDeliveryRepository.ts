import { IDeliveryDTO } from '../dtos/IDeliveryDTO';
import { Delivery } from '../entities/Delivery';

interface IDeliveryRepository {
  create(data: IDeliveryDTO): Promise<Delivery>;
  findByDeliverymanId(user_id: string): Promise<Delivery[]>;
  list(): Promise<Delivery[]>;
}

export { IDeliveryRepository };
