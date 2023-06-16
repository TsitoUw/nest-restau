import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateMenusDto {
  @IsString()
  name: string;

  @IsString()
  menusCategoriesId: string;

  @IsOptional()
  @IsArray({ each: true })
  dishes?: Array<{ id: string }>;
}
