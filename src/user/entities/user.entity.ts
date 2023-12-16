import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Role } from '../interface';
import { MagneticChain } from '../../magnetic-chain/entities/magnetic-chain.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  @Index()
  user_id: string;

  @Column({ unique: true })
  name: string;

  @Column({ select: false })
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

  @Column({ nullable: true, type: 'enum', enum: Role, default: Role.User })
  role: string;

  @OneToMany(() => MagneticChain, (magnetic_chains) => magnetic_chains.user)
  magnetic_chains: MagneticChain[];
}
