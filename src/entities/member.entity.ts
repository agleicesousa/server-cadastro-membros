import { Entity, Column } from 'typeorm';
import { accountType, BaseEntity, ageRange, gender } from './base.entity';

@Entity()
export class Member extends BaseEntity {
  @Column()
  accountType: accountType;

  @Column()
  ageRange: ageRange;

  @Column({ unique: true })
  registrationNumber: string;

  @Column()
  fullName: string;

  @Column()
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

  @Column({ nullable: true })
  adminCreatorID: number;
}
