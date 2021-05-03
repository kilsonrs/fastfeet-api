import { Recipient } from '../../entities/Recipient';
import { IRecipientRepository } from '../../repositories/IRecipientRepository';

class ListRecipientUseCase {
  constructor(private recipientRepository: IRecipientRepository) {}

  async execute(): Promise<Recipient[]> {
    const recipients = await this.recipientRepository.list();
    return recipients;
  }
}

export { ListRecipientUseCase };
