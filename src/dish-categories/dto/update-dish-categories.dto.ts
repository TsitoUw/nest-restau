import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateDishCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray({ each: true })
  dishes?: Array<{ id: string }>;
}
