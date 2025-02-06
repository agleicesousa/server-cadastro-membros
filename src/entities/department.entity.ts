import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Member } from './member.entity';

@Entity()
export class Department extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Member, (member) => member.departments)
  members: Member[];
}
