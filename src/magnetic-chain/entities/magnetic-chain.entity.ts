import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MagneticChain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  link: string;

  @Column('varchar', {
    array: true,
    nullable: true,
    transformer: {
      to: (value: string[]) => value.join(','),
      from: (value: string) => value.split(','),
    },
  })
  tag: string[] | null;

  @Column()
  hash: string;

  @CreateDateColumn()
  create_date: string;
}
