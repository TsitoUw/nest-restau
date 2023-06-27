import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTablesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isVip?: boolean;

  @IsOptional()
  @IsString()
  userId?: string;
}
