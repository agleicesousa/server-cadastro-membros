import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity, stateInitials } from './base.entity';
import { Member } from './member.entity';

@Entity()
export class Address extends BaseEntity {
  @Column()
  country: string;

  @Column({
    type: 'enum',
    enum: stateInitials
  })
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

  @OneToMany(() => Member, (member) => member.address)
  members: Member[];
}
