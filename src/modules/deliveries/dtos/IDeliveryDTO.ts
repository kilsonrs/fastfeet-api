interface IDeliveryDTO {
  deliveryman_id: string;
  recipient_id: string;
  package_name: string;
  canceled_at?: string;
  signature?: string;
  start_date?: Date;
  end_date?: Date;
}

export { IDeliveryDTO };
