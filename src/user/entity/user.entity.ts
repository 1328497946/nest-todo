// import { Exclude } from 'class-transformer';
import { MaxLength, MinLength } from 'class-validator';
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
  @MinLength(5, { message: '用户名不能少于5个字符' })
  @MaxLength(18, { message: '用户名不长少于18个字符' })
  name: string;

  @Column({ select: false })
  @MinLength(6, { message: '密码不能少于5个字符' })
  @MaxLength(18, { message: '密码不长少于18个字符' })
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
}
