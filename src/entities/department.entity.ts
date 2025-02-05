import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Member } from './member.entity';

@Entity()
export class Department extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Member, (member) => member.departments)
  members: Member[];
}
