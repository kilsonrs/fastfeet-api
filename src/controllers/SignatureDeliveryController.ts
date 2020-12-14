import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateSignatureDeliveryService from '../services/UpdateSignatureDeliveryService';

class SignatureDeliveryController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateSignature = new UpdateSignatureDeliveryService();
    const deliveryman_id = request.user.id;
    const { delivery_id } = request.params;
    const signatureFilename = request.file.filename;
    const delivery = await updateSignature.execute({
      deliveryman_id,
      delivery_id,
      signatureFilename,
    });
    return response.json(classToClass(delivery));
  }
}

export default SignatureDeliveryController;
