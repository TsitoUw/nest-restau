import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateDishCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray({ each: true })
  dishes?: Array<{ id: string }>;
}
