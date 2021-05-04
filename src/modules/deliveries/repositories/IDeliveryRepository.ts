import { IDeliveryDTO } from '../dtos/IDeliveryDTO';
import { IFindAllInNeighborhoodFromDeliverymanDTO } from '../dtos/IFindAllInNeighborhoodFromDeliverymanDTO';
import { Delivery } from '../entities/Delivery';

interface IDeliveryRepository {
  create(data: IDeliveryDTO): Promise<Delivery>;
  findAllInNeighborhoodFromDeliveryman(
    data: IFindAllInNeighborhoodFromDeliverymanDTO,
  ): Promise<Delivery[]>;
  list(): Promise<Delivery[]>;
}

export { IDeliveryRepository };
