/* eslint-disable max-classes-per-file */
import { Recipient } from '../entities/Recipient';

interface IRecipientDTO {
  name: string;
  street_name: string;
  street_number: number;
  neighborhood: string;
  city: string;
  state: string;
  uf: string;
  postal_code: string;
}

interface IRecipientRepository {
  create(data: IRecipientDTO): Promise<Recipient>;
}

class FakeRecipientRepository implements IRecipientRepository {
  private recipients: Recipient[] = [];

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

let fakeRecipientRepository: FakeRecipientRepository;
let createRecipientUseCase: CreateRecipientUseCase;

describe('CreateRecipient UseCase', () => {
  beforeEach(() => {
    fakeRecipientRepository = new FakeRecipientRepository();
    createRecipientUseCase = new CreateRecipientUseCase(
      fakeRecipientRepository,
    );
  });

  it('should be able create recipient', async () => {
    const recipient = await createRecipientUseCase.execute({
      name: 'any_name',
      street_name: 'any_street_name',
      street_number: 100,
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: 'any_state',
      uf: 'any_uf',
      postal_code: 'any_postal_code',
    });

    expect(recipient).toHaveProperty('id');
  });
});
