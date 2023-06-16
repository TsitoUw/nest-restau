import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateIngredientCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray({ each: true })
  ingredients?: Array<{ id: string }>;
}
