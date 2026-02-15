import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ActualitesService } from './actualites.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '../users/entities/user.entity';

@Controller('actualites')
export class ActualitesController {
  constructor(private readonly actualitesService: ActualitesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.CONTRIBUTEUR)
  create(@Body() createActualiteDto: any, @Request() req) {
    return this.actualitesService.create(createActualiteDto, req.user);
  }

  @Get()
  findAll() {
    return this.actualitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actualitesService.findOne(+id);
  }
}