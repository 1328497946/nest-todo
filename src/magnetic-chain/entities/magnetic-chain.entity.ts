import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MagneticChain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  link: string;

  @Column()
  tag: string;

  @Column()
  hash: string;

  @CreateDateColumn()
  crate_date: string;
}
