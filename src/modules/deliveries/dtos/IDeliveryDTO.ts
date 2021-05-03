interface IDeliveryDTO {
  deliveryman_id: string;
  recipient_id: string;
  package_name: string;
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

export { IDeliveryDTO };
