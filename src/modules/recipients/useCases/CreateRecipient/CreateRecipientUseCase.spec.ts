import { AppError } from '../../../../shared/errors/AppError';
import { FakeRecipientRepository } from '../../repositories/fakes/FakeRecipientRepository';
import { CreateRecipientUseCase } from './CreateRecipientUseCase';

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
