import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';
import { Match } from './entities/match.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, User])],
  controllers: [MatchsController],
  providers: [MatchsService],
})
export class MatchsModule {}