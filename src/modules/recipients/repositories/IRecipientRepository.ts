import { IRecipientDTO } from '../dtos/IRecipientDTO';
import { Recipient } from '../entities/Recipient';

interface IRecipientRepository {
  create(data: IRecipientDTO): Promise<Recipient>;
  findByName(name: string): Promise<Recipient>;
  list(): Promise<Recipient[]>;
}

export { IRecipientRepository };
