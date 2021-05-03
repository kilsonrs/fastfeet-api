import { getRepository, Repository } from 'typeorm';

import { IRecipientDTO } from '../../dtos/IRecipientDTO';
import { Recipient } from '../../entities/Recipient';
import { IRecipientRepository } from '../IRecipientRepository';

class RecipientRepository implements IRecipientRepository {
  repository: Repository<Recipient>;

  constructor() {
    this.repository = getRepository(Recipient);
  }

  async list(): Promise<Recipient[]> {
    const recipients = await this.repository.find();
    return recipients;
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
    const recipient = await this.repository.create({
      name,
      street_name,
      street_number,
      neighborhood,
      city,
      state,
      uf,
      postal_code,
    });
    await this.repository.save(recipient);

    return recipient;
  }
}

export { RecipientRepository };
