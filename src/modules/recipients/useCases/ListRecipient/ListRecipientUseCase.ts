import { inject, injectable } from 'tsyringe';

import { Recipient } from '../../entities/Recipient';
import { IRecipientRepository } from '../../repositories/IRecipientRepository';

@injectable()
class ListRecipientUseCase {
  constructor(
    @inject('RecipientRepository')
    private recipientRepository: IRecipientRepository,
  ) {}

  async execute(): Promise<Recipient[]> {
    const recipients = await this.recipientRepository.list();
    return recipients;
  }
}

export { ListRecipientUseCase };
