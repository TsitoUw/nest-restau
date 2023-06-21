import { IngredientUnit } from '@prisma/client';
import { IsArray, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateIngredientsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  inStock?: number;

  @IsOptional()
  @IsString()
  unit: IngredientUnit;

  @IsOptional()
  @IsArray({ each: true })
  dishes?: Array<{ id: string }>;
}
