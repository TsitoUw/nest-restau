import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateMenusDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  menusCategoriesId?: string;

  @IsOptional()
  @IsArray({ each: true })
  dishes?: Array<{ id: string }>;
}
