/* eslint-disable max-classes-per-file */
import { AppError } from '../../../../shared/errors/AppError';
import { FakeDeliveryRepository } from '../../repositories/fakes/FakeDeliveryRepository';
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

let fakeDeliveryRepository: FakeDeliveryRepository;
let createDeliveryUseCase: CreateDeliveryUseCase;

describe('Create Delivery', () => {
  beforeEach(() => {
    fakeDeliveryRepository = new FakeDeliveryRepository();
    createDeliveryUseCase = new CreateDeliveryUseCase(fakeDeliveryRepository);
  });

  it('should be able to create a delivey', async () => {
    const delivery = await createDeliveryUseCase.execute({
      deliveryman_id: 'any_id',
      recipient_id: 'any_id',
      package_name: 'any_package_name',
      address: 'any_address',
      postal_code: 'any_postal_code',
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: 'any_state',
    });
    expect(delivery).toHaveProperty('id');
  });

  it('should not be able to create a delivey without deliveryman_id', async () => {
    await expect(
      createDeliveryUseCase.execute({
        deliveryman_id: '',
        recipient_id: 'any_id',
        package_name: 'any_package_name',
        address: 'any_address',
        postal_code: 'any_postal_code',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a delivey without recipient_id', async () => {
    await expect(
      createDeliveryUseCase.execute({
        deliveryman_id: 'any_id',
        recipient_id: '',
        package_name: 'any_package_name',
        address: 'any_address',
        postal_code: 'any_postal_code',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a delivey without package_name', async () => {
    await expect(
      createDeliveryUseCase.execute({
        deliveryman_id: 'any_id',
        recipient_id: 'any_id',
        package_name: '',
        address: 'any_address',
        postal_code: 'any_postal_code',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
