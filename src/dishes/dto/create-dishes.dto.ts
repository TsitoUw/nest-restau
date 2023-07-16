import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDishesDto {
  @IsArray()
  files: Array<any>

  @IsString()
  name: string;
  
  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  menusId: string;

  @IsString()
  dishCategoriesId: string;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  ingredients?: Array<{ id: string }>;

  @IsOptional()
  @IsArray({ each: true })
  orderItems?: Array<{ id: string }>;
  
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  photos?: Array<{ id: string }>;
}
