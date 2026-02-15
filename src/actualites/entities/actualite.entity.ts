import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Actualite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column({ type: 'text' })
  contenu: string;

  @CreateDateColumn()
  datePublication: Date;

  @ManyToOne(() => User, { eager: true }) 
  auteur: User;
}
