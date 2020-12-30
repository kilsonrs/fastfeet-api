import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListDeliveryService } from '../services/ListDeliveryService';
import { CreateDeliveryService } from '../services/CreateDeliveryService';
import { UpdateDeliveryService } from '../services/UpdateDeliveryService';
import { DeleteDeliveryService } from '../services/DeleteDeliveryService';

class DeliveryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDeliveries = new ListDeliveryService();
    const deliveries = await listDeliveries.execute();
    return response.json(classToClass(deliveries));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createDelivery = new CreateDeliveryService();
    const {
      deliveryman_id,
      recipient,
      product,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    } = request.body;

    const delivery = await createDelivery.execute({
      deliveryman_id,
      recipient,
      product,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    });
    return response.json(delivery);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateDelivery = new UpdateDeliveryService();
    const { delivery_id } = request.params;
    const {
      deliveryman_id,
      recipient,
      product,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    } = request.body;

    const delivery = await updateDelivery.execute({
      delivery_id,
      deliveryman_id,
      recipient,
      product,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    });
    return response.json(delivery);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteDelivery = new DeleteDeliveryService();
    const { delivery_id } = request.params;
    await deleteDelivery.execute(delivery_id);
    return response.status(200).send();
  }
}

export { DeliveryController };
