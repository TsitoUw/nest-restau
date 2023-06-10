import { Dishes } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsArray()
  dishes: Dishes[];
}
