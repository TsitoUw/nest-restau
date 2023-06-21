import { IsOptional, IsString, MinLength } from 'class-validator';

export class SignupDto {
  
  @IsString()
  username?: string;

  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  role?: 'ADMIN' | 'CLIENT';
}
