import { Roles } from '@prisma/client';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsString()
  role: Roles;
}
