import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

export enum accountType {
  ADMIN = 'admin',
  USER = 'user',
  LEADER = 'leader'
}

export enum ageRange {
  KIDS = 'kids',
  TEEN = 'teen',
  ADULT = 'adult'
}

export enum gender {
  MAN = 'man',
  WOMAN = 'woman',
  OTHER = 'other',
  NOT_INFORMED = 'not informed'
}

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setDataAtualizacao(): void {
    this.createdAt = new Date();
  }
}
