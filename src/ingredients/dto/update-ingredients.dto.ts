import { Dishes } from '@prisma/client';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateIngredientDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsArray()
  dishes: Dishes[];
}
