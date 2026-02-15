import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actualite } from './entities/actualite.entity';

@Injectable()
export class ActualitesService {
  constructor(
    @InjectRepository(Actualite) private actualiteRepository: Repository<Actualite>,
  ) {}

  create(createActualiteDto: any, user: any) {
    const actu = this.actualiteRepository.create({ ...createActualiteDto, auteur: user });
    return this.actualiteRepository.save(actu);
  }

  findAll() {
    return this.actualiteRepository.find();
  }

  findOne(id: number) {
    return this.actualiteRepository.findOne({ where: { id } });
  }
}