import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('recipients')
class Recipient {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  street_name: string;

  @Column()
  street_number: number;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  uf: string;

  @Column()
  postal_code: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Recipient };
