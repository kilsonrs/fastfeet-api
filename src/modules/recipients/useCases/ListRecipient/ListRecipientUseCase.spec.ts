import { FakeRecipientRepository } from '../../repositories/fakes/FakeRecipientRepository';
import { CreateRecipientUseCase } from '../CreateRecipient/CreateRecipientUseCase';
import { ListRecipientUseCase } from './ListRecipientUseCase';

let fakeRecipientRepository: FakeRecipientRepository;
let createRecipientUseCase: CreateRecipientUseCase;
let listRecipientUseCase: ListRecipientUseCase;

describe('CreateRecipient UseCase', () => {
  beforeEach(() => {
    fakeRecipientRepository = new FakeRecipientRepository();
    createRecipientUseCase = new CreateRecipientUseCase(
      fakeRecipientRepository,
    );
    listRecipientUseCase = new ListRecipientUseCase(fakeRecipientRepository);
  });

  it('should be able to list recipients', async () => {
    const recipient1 = await createRecipientUseCase.execute({
      name: 'any_name',
      street_name: 'any_street_name',
      street_number: 100,
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: 'any_state',
      uf: 'any_uf',
      postal_code: 'any_postal_code',
    });

    const recipient2 = await createRecipientUseCase.execute({
      name: 'other_name',
      street_name: 'other_street_name',
      street_number: 200,
      neighborhood: 'other_neighborhood',
      city: 'other_city',
      state: 'other_state',
      uf: 'other_uf',
      postal_code: 'other_postal_code',
    });

    const recipientsList = await listRecipientUseCase.execute();

    expect(recipientsList).toEqual([recipient1, recipient2]);
  });
});
