import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDishesDto {
  @IsOptional()
  @IsString()
  name?: string;
  
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  menusId?: string;

  @IsOptional()
  @IsString()
  dishCategoriesId?: string;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  ingredients?: Array<{ id: string }>;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  orderItems?: Array<{ id: string }>;
  
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  photos?: Array<{ id: string }>;
}
