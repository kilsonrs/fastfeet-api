import { IRecipientDTO } from '../../dtos/IRecipientDTO';
import { Recipient } from '../../entities/Recipient';
import { IRecipientRepository } from '../IRecipientRepository';

class FakeRecipientRepository implements IRecipientRepository {
  private recipients: Recipient[] = [];

  async findById(id: string): Promise<Recipient> {
    return this.recipients.find(recipient => recipient.id === id);
  }

  async findByName(name: string): Promise<Recipient> {
    return this.recipients.find(recipient => recipient.name === name);
  }

  async list(): Promise<Recipient[]> {
    return this.recipients;
  }

  async create({
    name,
    street_name,
    street_number,
    neighborhood,
    city,
    state,
    uf,
    postal_code,
  }: IRecipientDTO): Promise<Recipient> {
    const recipient = new Recipient();
    Object.assign(recipient, {
      name,
      street_name,
      street_number,
      neighborhood,
      city,
      state,
      uf,
      postal_code,
    });
    this.recipients.push(recipient);
    return recipient;
  }
}

export { FakeRecipientRepository };
