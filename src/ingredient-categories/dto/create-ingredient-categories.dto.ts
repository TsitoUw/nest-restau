import { IsString } from 'class-validator';

export class CreateIngredientCategoryDto {
  @IsString()
  name: string;
}
