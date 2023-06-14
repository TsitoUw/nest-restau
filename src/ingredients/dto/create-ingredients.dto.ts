import { IsString } from 'class-validator';

export class CreateIngredientsDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;
}
