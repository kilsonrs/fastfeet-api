import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { ListDeliverymanHistoryService } from '../services/ListDeliverymanHistoryService';

type Neighborhood = {
  neighborhood: string;
};

class DeliverymanHistoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const deliveryman_id = request.user.id;
    const { neighborhood } = request.query as Neighborhood;
    const listDeliverymanHistory = new ListDeliverymanHistoryService();

    const deliveries = await listDeliverymanHistory.execute({
      deliveryman_id,
      neighborhood,
    });
    return response.json(classToClass(deliveries));
  }
}
export { DeliverymanHistoryController };
