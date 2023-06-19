import { IsOptional, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  role?: 'ADMIN' | 'CLIENT';
}
