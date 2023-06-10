import { IsString } from 'class-validator';

export class UpdateIngredientCategoryDto {
  @IsString()
  name: string;
}
