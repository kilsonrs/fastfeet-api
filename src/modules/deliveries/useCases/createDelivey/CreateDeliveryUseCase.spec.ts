import { AppError } from '../../../../shared/errors/AppError';
import { FakeHashProvider } from '../../../../shared/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUserRepository } from '../../../accounts/repositories/fakes/FakeUserRepository';
import { CreateUserUseCase } from '../../../accounts/useCases/CreateUser/CreateUserUseCase';
import { FakeRecipientRepository } from '../../../recipients/repositories/fakes/FakeRecipientRepository';
import { CreateRecipientUseCase } from '../../../recipients/useCases/CreateRecipient/CreateRecipientUseCase';
import { FakeDeliveryRepository } from '../../repositories/fakes/FakeDeliveryRepository';
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let fakeRecipientRepository: FakeRecipientRepository;
let createRecipientUseCase: CreateRecipientUseCase;

let fakeDeliveryRepository: FakeDeliveryRepository;
let createDeliveryUseCase: CreateDeliveryUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Create Delivery', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    fakeRecipientRepository = new FakeRecipientRepository();
    createRecipientUseCase = new CreateRecipientUseCase(
      fakeRecipientRepository,
    );

    createUserUseCase = new CreateUserUseCase(
      fakeUserRepository,
      fakeHashProvider,
    );

    fakeDeliveryRepository = new FakeDeliveryRepository();
    createDeliveryUseCase = new CreateDeliveryUseCase(
      fakeUserRepository,
      fakeRecipientRepository,
      fakeDeliveryRepository,
    );
  });

  it('should be able to create a delivey', async () => {
    const deliveryman = await createUserUseCase.execute({
      name: 'deliveryman_name',
      cpf: 'deliveryman_cpf',
      email: 'deliveryman_email@mail.com',
      password: 'deliveryman_password',
      password_confirmation: 'deliveryman_password',
    });

    const recipient = await createRecipientUseCase.execute({
      name: 'recipient_name',
      street_name: 'recipient_street_name',
      street_number: 100,
      neighborhood: 'recipient_neighborhood',
      city: 'recipient_city',
      state: 'recipient_state',
      uf: 'recipient_uf',
      postal_code: 'recipient_postal_code',
    });

    const delivery = await createDeliveryUseCase.execute({
      deliveryman_id: deliveryman.id,
      recipient_id: recipient.id,
      package_name: 'any_package_name',
    });

    expect(delivery).toHaveProperty('id');
  });

  it('should not be able to create a delivey with non-existing deliveryman', async () => {
    const recipient = await createRecipientUseCase.execute({
      name: 'recipient_name',
      street_name: 'recipient_street_name',
      street_number: 100,
      neighborhood: 'recipient_neighborhood',
      city: 'recipient_city',
      state: 'recipient_state',
      uf: 'recipient_uf',
      postal_code: 'recipient_postal_code',
    });
    await expect(
      createDeliveryUseCase.execute({
        deliveryman_id: 'non-existing_deliveryman',
        recipient_id: recipient.id,
        package_name: 'any_package_name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a delivey with non-existing recipient', async () => {
    const deliveryman = await createUserUseCase.execute({
      name: 'deliveryman_name',
      cpf: 'deliveryman_cpf',
      email: 'deliveryman_email@mail.com',
      password: 'deliveryman_password',
      password_confirmation: 'deliveryman_password',
    });

    await expect(
      createDeliveryUseCase.execute({
        deliveryman_id: deliveryman.id,
        recipient_id: 'non-existing_recipient',
        package_name: 'any_package_name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a delivey without package_name', async () => {
    const deliveryman = await createUserUseCase.execute({
      name: 'deliveryman_name',
      cpf: 'deliveryman_cpf',
      email: 'deliveryman_email@mail.com',
      password: 'deliveryman_password',
      password_confirmation: 'deliveryman_password',
    });

    const recipient = await createRecipientUseCase.execute({
      name: 'recipient_name',
      street_name: 'recipient_street_name',
      street_number: 100,
      neighborhood: 'recipient_neighborhood',
      city: 'recipient_city',
      state: 'recipient_state',
      uf: 'recipient_uf',
      postal_code: 'recipient_postal_code',
    });

    await expect(
      createDeliveryUseCase.execute({
        deliveryman_id: deliveryman.id,
        recipient_id: recipient.id,
        package_name: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
