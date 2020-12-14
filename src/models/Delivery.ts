import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import User from './User';

@Entity('deliveries')
class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deliveryman_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: User;

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

  @Column()
  state: string;

  @Column('time with time zone')
  canceled_at: string;

  @Column()
  signature_id: string;

  @Column('timestamp without time zone')
  start_date: Date;

  @Column('timestamp without time zone')
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'signature_url' })
  getSignatureUrl(): string | null {
    if (!this.signature_id) {
      return null;
    }
    return `${process.env.APP_API_URL}/files/${this.signature_id}`;
  }
}

export default Delivery;
