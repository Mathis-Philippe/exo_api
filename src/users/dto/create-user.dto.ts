import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail() 
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRole, {
    message: 'Le rôle doit être soit coach, contributeur ou joueur',
  })
  role: UserRole;
}