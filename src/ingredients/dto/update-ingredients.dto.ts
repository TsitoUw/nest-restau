import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateIngredientsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsArray({ each: true })
  dishes?: Array<{ id: string }>;
}
