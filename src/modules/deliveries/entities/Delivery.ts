import { Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '../../accounts/entities/User';
import { Recipient } from '../../recipients/entities/Recipient';

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
  recipient_id: string;

  @ManyToOne(() => Recipient)
  @JoinColumn({ name: 'recipient_id' })
  recipient: Recipient;

  @Column()
  package_name: string;

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Delivery };
