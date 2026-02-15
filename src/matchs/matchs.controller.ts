import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '../users/entities/user.entity';

@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.COACH)
  create(@Body() createMatchDto: any) {
    return this.matchsService.create(createMatchDto);
  }

  @Get()
  findAll() {
    return this.matchsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.COACH)
  update(@Param('id') id: string, @Body() updateMatchDto: any) {
    return this.matchsService.update(+id, updateMatchDto);
  }

  @Post(':id/inscription')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.JOUEUR)
  register(@Param('id') id: string, @Request() req) {
    return this.matchsService.registerPlayer(+id, req.user.id);
  }

  @Delete(':id/inscription')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.JOUEUR)
  unregister(@Param('id') id: string, @Request() req) {
    return this.matchsService.unregisterPlayer(+id, req.user.id);
  }
}