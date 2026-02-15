import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Match) private matchsRepository: Repository<Match>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createMatchDto: any) {
    const existingMatch = await this.matchsRepository.findOne({ where: { date: createMatchDto.date } });
    if (existingMatch) throw new BadRequestException('Un match est déjà prévu ce jour-là.');
    
    const match = this.matchsRepository.create(createMatchDto);
    return this.matchsRepository.save(match);
  }

  findAll() {
    return this.matchsRepository.find({ relations: ['participants'] });
  }

  findOne(id: number) {
    return this.matchsRepository.findOne({ where: { id }, relations: ['participants'] });
  }

  update(id: number, updateMatchDto: any) {
    return this.matchsRepository.update(id, updateMatchDto);
  }

  async registerPlayer(matchId: number, userId: number) {
    const match = await this.findOne(matchId);
    if (!match) {
      throw new NotFoundException('Match introuvable');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    if (!match.participants) match.participants = [];
    match.participants.push(user);
    
    return this.matchsRepository.save(match);
  }

  async unregisterPlayer(matchId: number, userId: number) {
    const match = await this.findOne(matchId);
    if (!match) {
      throw new NotFoundException('Match introuvable');
    }

    if (match.participants) {
      match.participants = match.participants.filter(p => p.id !== userId);
    }
    
    return this.matchsRepository.save(match);
  }
}