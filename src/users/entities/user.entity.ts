import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Match } from '../../matchs/entities/match.entity';

export enum UserRole {
  COACH = 'coach',
  CONTRIBUTEUR = 'contributeur',
  JOUEUR = 'joueur',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.JOUEUR
  })
  role: UserRole;

  @Column({ default: false })
  isValidated: boolean;

  @ManyToMany(() => Match, (match) => match.participants)
  matchs: Match[];
}