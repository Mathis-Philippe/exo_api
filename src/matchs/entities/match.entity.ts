import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string; 

  @Column()
  adversaire: string;

  @Column({ nullable: true })
  scoreFinal: string;

  @ManyToMany(() => User, (user) => user.matchs)
  @JoinTable() 
  participants: User[];
}