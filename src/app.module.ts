import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Match } from './matchs/entities/match.entity';
import { Actualite } from './actualites/entities/actualite.entity';
import { AuthModule } from './auth/auth.module';
import { MatchsModule } from './matchs/matchs.module';
import { ActualitesModule } from './actualites/actualites.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'hcc.db',
      entities: [User, Match, Actualite],
      synchronize: true, 
    }),
    UsersModule,
    AuthModule,
    MatchsModule,
    ActualitesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}