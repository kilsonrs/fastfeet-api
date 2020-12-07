import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('deliveries')
class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deliveryman_id: string;

  @Column()
  recipient: string;

  @Column()
  product: string;

  @Column()
  address: string;

  @Column()
  postal_code: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column('time with time zone')
  state: string;

  @Column('time with time zone')
  canceled_at: string;

  @Column()
  signature_id: string;

  @Column('time with time zone')
  start_date: string;

  @Column('time with time zone')
  end_date: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default Delivery;
