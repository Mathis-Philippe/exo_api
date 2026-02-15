import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActualitesService } from './actualites.service';
import { ActualitesController } from './actualites.controller';
import { Actualite } from './entities/actualite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actualite])],
  controllers: [ActualitesController],
  providers: [ActualitesService],
})
export class ActualitesModule {}