import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  is_admin!: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
