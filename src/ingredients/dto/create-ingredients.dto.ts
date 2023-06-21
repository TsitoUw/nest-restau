import { IngredientUnit } from '@prisma/client';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateIngredientsDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  inStock?: number;

  @IsString()
  unit: IngredientUnit;

  @IsOptional()
  @IsArray({ each: true })
  dishes?: Array<{ id: string }>;
}
