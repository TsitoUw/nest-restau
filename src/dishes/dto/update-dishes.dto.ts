import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDishesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  menusId?: string;

  @IsOptional()
  @IsString()
  dishCategoriesId?: string;

  @IsOptional()
  @IsArray({ each: true })
  ingredients?: Array<{ id: string }>;

  @IsOptional()
  @IsArray({ each: true })
  orderItems?: Array<{ id: string }>;
}
