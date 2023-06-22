import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDishesDto {
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

  @IsArray()
  @IsObject({ each: true })
  ingredients?: Array<{ id: string }>;

  @IsOptional()
  @IsArray({ each: true })
  orderItems?: Array<{ id: string }>;
  
  @IsArray()
  @IsObject({ each: true })
  photos?: Array<{ id: string }>;
}
