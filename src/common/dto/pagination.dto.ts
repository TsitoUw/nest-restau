import { IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  page: number;

  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsString()
  filter: string;
}
