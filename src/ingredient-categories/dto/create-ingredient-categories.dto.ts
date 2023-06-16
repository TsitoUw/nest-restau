import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateIngredientCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray({ each: true })
  ingredients?: Array<{ id: string }>;
}
