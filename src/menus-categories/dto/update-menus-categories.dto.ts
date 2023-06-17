import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateMenusCategoriesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  menus?: Array<{ id: string }>;
}
