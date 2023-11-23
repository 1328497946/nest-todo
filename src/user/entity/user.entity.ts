// import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  user_id: string;

  @Column({ unique: true })
  name: string;

  @Column({ select: false })
  password: string;

  // @Column({ nullable: true })
  // @Exclude()
  // refresh_token: string;

  @Column({ nullable: true })
  age: number;

  @CreateDateColumn()
  create_date: string;

  @UpdateDateColumn()
  update_date: string;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  refresh_token: string;
}
