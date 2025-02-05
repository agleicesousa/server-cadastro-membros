import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { accountType, BaseEntity, ageRange, gender } from './base.entity';
import { Address } from './address.entity';
import { Department } from './department.entity';

@Entity()
export class Member extends BaseEntity {
  @Column({
    type: 'enum',
    enum: accountType
  })
  accountType: accountType;

  @Column({
    type: 'enum',
    enum: ageRange
  })
  ageRange: ageRange;

  @Column({ unique: true })
  registrationNumber: string;

  @Column()
  fullName: string;

  @Column({
    type: 'enum',
    enum: gender
  })
  gender: gender;

  @Column({ unique: true, nullable: true })
  cpf: string;

  @Column()
  birthDate: Date;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @ManyToOne(() => Address, (address) => address.members, { nullable: true })
  address: Address;

  @OneToMany(() => Department, (department) => department.members)
  departments: Department[];
}
