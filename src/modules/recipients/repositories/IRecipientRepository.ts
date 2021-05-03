import { IRecipientDTO } from '../dtos/IRecipientDTO';
import { Recipient } from '../entities/Recipient';

interface IRecipientRepository {
  create(data: IRecipientDTO): Promise<Recipient>;
}

export { IRecipientRepository };
