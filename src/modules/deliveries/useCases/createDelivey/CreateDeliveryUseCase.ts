import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../../accounts/repositories/IUsersRepository';
import { IRecipientRepository } from '../../../recipients/repositories/IRecipientRepository';
import { IDeliveryDTO } from '../../dtos/IDeliveryDTO';
import { Delivery } from '../../entities/Delivery';
import { IDeliveryRepository } from '../../repositories/IDeliveryRepository';

@injectable()
class CreateDeliveryUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RecipientRepository')
    private recipientRepository: IRecipientRepository,
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  async execute({
    deliveryman_id,
    recipient_id,
    package_name,
  }: IDeliveryDTO): Promise<Delivery> {
    if (!deliveryman_id) {
      throw new AppError('Deliveryman must be provided');
    }
    if (!recipient_id) {
      throw new AppError('Recipient must be provided');
    }
    if (!package_name) {
      throw new AppError('Package name must be provided');
    }

    const deliveryman = await this.usersRepository.findById(deliveryman_id);
    if (!deliveryman) {
      throw new AppError('Deliveryman not found');
    }

    const recipient = await this.recipientRepository.findById(recipient_id);
    if (!recipient) {
      throw new AppError('Recipient not found');
    }

    const delivery = await this.deliveryRepository.create({
      deliveryman_id,
      recipient_id,
      package_name,
    });
    return delivery;
  }
}

export { CreateDeliveryUseCase };
