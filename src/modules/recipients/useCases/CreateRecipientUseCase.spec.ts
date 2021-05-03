/* eslint-disable max-classes-per-file */
import { AppError } from '../../../shared/errors/AppError';
import { IRecipientDTO } from '../dtos/IRecipientDTO';
import { Recipient } from '../entities/Recipient';
import { FakeRecipientRepository } from '../repositories/fakes/FakeRecipientRepository';
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

let fakeRecipientRepository: FakeRecipientRepository;
let createRecipientUseCase: CreateRecipientUseCase;

describe('CreateRecipient UseCase', () => {
  beforeEach(() => {
    fakeRecipientRepository = new FakeRecipientRepository();
    createRecipientUseCase = new CreateRecipientUseCase(
      fakeRecipientRepository,
    );
  });

  it('should be able create a recipient', async () => {
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

  it('should not be able create a recipient without recipient name', async () => {
    await expect(
      createRecipientUseCase.execute({
        name: '',
        street_name: 'any_street_name',
        street_number: 100,
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
        uf: 'any_uf',
        postal_code: 'any_postal_code',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
