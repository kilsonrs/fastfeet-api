import { IDeliveryDTO } from '../dtos/IDeliveryDTO';
import { Delivery } from '../entities/Delivery';

interface IDeliveryRepository {
  create(data: IDeliveryDTO): Promise<Delivery>;
}

export { IDeliveryRepository };
