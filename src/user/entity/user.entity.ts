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
  user_id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  age: number;

  @CreateDateColumn()
  create_date: string;

  @UpdateDateColumn()
  update_date: string;
}
