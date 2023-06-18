import { IsOptional, IsPositive, IsString } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsPositive()
  offset?: number;
}
