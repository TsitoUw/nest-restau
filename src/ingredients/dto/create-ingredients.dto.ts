import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateIngredientsDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsArray({ each: true })
  dishes?: Array<{ id: string }>;
}
