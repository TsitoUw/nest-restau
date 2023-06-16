import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateMenusCategoriesDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray({ each: true })
  menus?: Array<{ id: string }>;
}
