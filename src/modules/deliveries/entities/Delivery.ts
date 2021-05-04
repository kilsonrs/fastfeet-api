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

  @ManyToOne(() => User, user => user.deliveries, {
    eager: true,
  })
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: User;

  @Column()
  recipient_id: string;

  @ManyToOne(() => Recipient, recipient => recipient.deliveries, {
    eager: true,
  })
  @JoinColumn({ name: 'recipient_id' })
  recipient: Recipient;

  @Column()
  package_name: string;

  @Column()
  signature: string;

  @Column('time with time zone')
  canceled_at: string;

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
    if (!this.signature) {
      return null;
    }
    return `${process.env.APP_API_URL}/files/${this.signature}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Delivery };
