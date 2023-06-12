import { IsOptional, IsString } from 'class-validator';

export class UpdateIngredientsDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  categoriesId: string;
}
