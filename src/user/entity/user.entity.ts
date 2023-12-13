import { IsEnum, MaxLength, MinLength } from 'class-validator';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../interface';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  user_id: string;

  @Column({ unique: true })
  @MinLength(5)
  @MaxLength(18)
  name: string;

  @Column({ select: false })
  @MinLength(6)
  @MaxLength(18)
  password: string;

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

  @IsEnum(Role)
  @Column({ nullable: true })
  role: string;
}
