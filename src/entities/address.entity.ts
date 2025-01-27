import { Entity, Column } from 'typeorm';
import { BaseEntity, stateInitials } from './base.entity';

@Entity()
export class Address extends BaseEntity {
  @Column()
  country: string;
  
  @Column()
  stateInitials: stateInitials;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @Column()
  cep: string;
}
