import { Ingredients } from '@prisma/client';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateDishesDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsString()
  menuId: string;

  @IsNumber()
  price: number;

  @IsArray()
  ingredients: Ingredients[];
}
