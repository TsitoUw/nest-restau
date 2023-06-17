import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateMenusCategoriesDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  menus?: Array<{ id: string }>;
}
