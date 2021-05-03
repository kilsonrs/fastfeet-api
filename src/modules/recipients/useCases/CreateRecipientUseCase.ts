import { AppError } from '../../../shared/errors/AppError';
import { IRecipientDTO } from '../dtos/IRecipientDTO';
import { Recipient } from '../entities/Recipient';
import { IRecipientRepository } from '../repositories/IRecipientRepository';

class CreateRecipientUseCase {
  constructor(private recipientRepository: IRecipientRepository) {}

  async execute({
    name,
    street_name,
    street_number,
    neighborhood,
    city,
    state,
    uf,
    postal_code,
  }: IRecipientDTO): Promise<Recipient> {
    if (!name) {
      throw new AppError('Recipient name must be provided');
    }
    const recipient = await this.recipientRepository.create({
      name,
      street_name,
      street_number,
      neighborhood,
      city,
      state,
      uf,
      postal_code,
    });

    return recipient;
  }
}

export { CreateRecipientUseCase };
