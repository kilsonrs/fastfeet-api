/* eslint-disable max-classes-per-file */
import { AppError } from '../../../../shared/errors/AppError';
import { IDeliveryDTO } from '../../dtos/IDeliveryDTO';
import { Delivery } from '../../entities/Delivery';

interface IDeliveryRepository {
  create(data: IDeliveryDTO): Promise<Delivery>;
}

class FakeDeliveryRepository implements IDeliveryRepository {
  private deliveries: Delivery[] = [];

  async create({
    deliveryman_id,
    recipient_id,
    package_name,
    address,
    postal_code,
    neighborhood,
    city,
    state,
  }: IDeliveryDTO): Promise<Delivery> {
    const delivery = new Delivery();
    Object.assign(delivery, {
      deliveryman_id,
      recipient_id,
      package_name,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    });
    this.deliveries.push(delivery);
    return delivery;
  }
}

class CreateDeliveryUseCase {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  async execute({
    deliveryman_id,
    recipient_id,
    package_name,
    address,
    postal_code,
    neighborhood,
    city,
    state,
  }: IDeliveryDTO): Promise<Delivery> {
    if (!deliveryman_id) {
      throw new AppError('Deliveryman must be provided');
    }
    if (!recipient_id) {
      throw new AppError('Recipient must be provided');
    }
    if (!package_name) {
      throw new AppError('Package name must be provided');
    }
    const delivery = await this.deliveryRepository.create({
      deliveryman_id,
      recipient_id,
      package_name,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    });
    return delivery;
  }
}

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
