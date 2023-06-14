import { IsString } from 'class-validator';

export class UpdateIngredientsDto {
  @IsString()
  name?: string;

  @IsString()
  categoriesId?: string;
}
