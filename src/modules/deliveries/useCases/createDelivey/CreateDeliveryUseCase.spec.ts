/* eslint-disable max-classes-per-file */
import { AppError } from '../../../../shared/errors/AppError';
import { Delivery } from '../../entities/Delivery';

interface IDeliveryDTO {
  deliveryman_id: string;
  recipient_id: string;
  product: string;
  address: string;
  postal_code: string;
  neighborhood: string;
  city: string;
  state: string;
  canceled_at?: string;
  signature_id?: string;
  start_date?: Date;
  end_date?: Date;
}

interface IDeliveryRepository {
  create(data: IDeliveryDTO): Promise<Delivery>;
}

class FakeDeliveryRepository implements IDeliveryRepository {
  private deliveries: Delivery[] = [];

  async create({
    deliveryman_id,
    recipient_id,
    product,
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
      product,
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

  async execute(data: IDeliveryDTO): Promise<Delivery> {
    const delivery = await this.deliveryRepository.create(data);
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
      product: 'any_product',
      address: 'any_address',
      postal_code: 'any_postal_code',
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: 'any_state',
    });
    expect(delivery).toHaveProperty('id');
  });
});
