import { FakeHashProvider } from '../../../../shared/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUserRepository } from '../../../accounts/repositories/fakes/FakeUserRepository';
import { CreateUserUseCase } from '../../../accounts/useCases/CreateUser/CreateUserUseCase';
import { FakeRecipientRepository } from '../../../recipients/repositories/fakes/FakeRecipientRepository';
import { CreateRecipientUseCase } from '../../../recipients/useCases/CreateRecipient/CreateRecipientUseCase';
import { FakeDeliveryRepository } from '../../repositories/fakes/FakeDeliveryRepository';
import { CreateDeliveryUseCase } from '../createDelivey/CreateDeliveryUseCase';
import { ListDeliveryUseCase } from './ListDeliveryUseCase';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let fakeRecipientRepository: FakeRecipientRepository;
let createRecipientUseCase: CreateRecipientUseCase;

let fakeDeliveryRepository: FakeDeliveryRepository;
let createDeliveryUseCase: CreateDeliveryUseCase;
let createUserUseCase: CreateUserUseCase;

let listDeliveryUseCase: ListDeliveryUseCase;

describe('ListDelivery UseCase', () => {
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

    listDeliveryUseCase = new ListDeliveryUseCase(
      fakeUserRepository,
      fakeDeliveryRepository,
    );
  });

  it('should be able to administrator list all deliveries', async () => {
    const admin = await createUserUseCase.execute({
      name: 'admin_name',
      cpf: 'admin_cpf',
      email: 'admin_email@mail.com',
      is_deliveryman: false,
      password: 'admin_password',
      password_confirmation: 'admin_password',
    });

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

    const delivery1 = await createDeliveryUseCase.execute({
      deliveryman_id: deliveryman.id,
      recipient_id: recipient.id,
      package_name: 'delivery1_package_name',
    });

    const delivery2 = await createDeliveryUseCase.execute({
      deliveryman_id: deliveryman.id,
      recipient_id: recipient.id,
      package_name: 'delivery2_package_name',
    });

    const deliveries = await listDeliveryUseCase.execute({ user_id: admin.id });

    expect(deliveries).toEqual([delivery1, delivery2]);
  });

  it('should be able to deliveryman user to list only its own deliveries', async () => {
    const deliveryman1 = await createUserUseCase.execute({
      name: 'deliveryman1_name',
      cpf: 'deliveryman1_cpf',
      email: 'deliveryman1_email@mail.com',
      password: 'deliveryman1_password',
      password_confirmation: 'deliveryman1_password',
    });

    const deliveryman2 = await createUserUseCase.execute({
      name: 'deliveryman2_name',
      cpf: 'deliveryman2_cpf',
      email: 'deliveryman2_email@mail.com',
      password: 'deliveryman2_password',
      password_confirmation: 'deliveryman2_password',
    });

    const recipient1 = await createRecipientUseCase.execute({
      name: 'recipient1_name',
      street_name: 'recipient1_street_name',
      street_number: 100,
      neighborhood: 'recipient1_neighborhood',
      city: 'recipient1_city',
      state: 'recipient1_state',
      uf: 'recipient1_uf',
      postal_code: 'recipient1_postal_code',
    });

    const recipient2 = await createRecipientUseCase.execute({
      name: 'recipient2_name',
      street_name: 'recipient2_street_name',
      street_number: 100,
      neighborhood: 'recipient2_neighborhood',
      city: 'recipient2_city',
      state: 'recipient2_state',
      uf: 'recipient2_uf',
      postal_code: 'recipient2_postal_code',
    });

    const delivery1 = await createDeliveryUseCase.execute({
      deliveryman_id: deliveryman1.id,
      recipient_id: recipient1.id,
      package_name: 'delivery1_package_name',
    });

    await createDeliveryUseCase.execute({
      deliveryman_id: deliveryman2.id,
      recipient_id: recipient2.id,
      package_name: 'delivery2_package_name',
    });

    const deliveries = await listDeliveryUseCase.execute({
      user_id: deliveryman1.id,
    });

    expect(deliveries).toEqual([delivery1]);
  });
});
