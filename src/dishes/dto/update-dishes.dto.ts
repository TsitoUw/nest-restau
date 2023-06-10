import { Ingredients } from '@prisma/client';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateDishesDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  price: number;

  @IsOptional()
  @IsArray()
  ingredients: Ingredients[];

  @IsOptional()
  @IsString()
  menuId: string;
}
