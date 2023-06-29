import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

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

  @IsOptional()
  @IsEnum(SortOrder)
  order: SortOrder;
}
