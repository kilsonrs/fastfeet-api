import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Delivery from '../models/Delivery';
import DiskStorageProvider from '../providers/DiskStorageProvider';

interface IRequest {
  deliveryman_id: string;
  delivery_id: string;
  signatureFilename: string;
}

class UpdateSignatureDeliveryService {
  public async execute({
    deliveryman_id,
    delivery_id,
    signatureFilename,
  }: IRequest): Promise<Delivery> {
    const updateDelivery = getRepository(Delivery);
    const delivery = await updateDelivery.findOne(delivery_id);
    if (!delivery) {
      throw new AppError('Delivery not found');
    }
    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new AppError(
        'You cannot upload a delivery signature file from another delivery person.',
      );
    }
    const storageProvider = new DiskStorageProvider();

    if (delivery.signature_id) {
      await storageProvider.deleteFile(signatureFilename);
    }

    const filename = await storageProvider.saveFile(signatureFilename);

    console.log(filename);
    delivery.signature_id = filename;

    await updateDelivery.save(delivery);

    return delivery;
  }
}

export default UpdateSignatureDeliveryService;
