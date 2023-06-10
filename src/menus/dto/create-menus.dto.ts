import { Ingredients } from '@prisma/client';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateMenusDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsNumber()
  price: number;

  @IsArray()
  ingredients: Ingredients[];
}
