import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDishesDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  menusId: string;

  @IsString()
  dishCategoriesId: string;

  @IsOptional()
  @IsArray({ each: true })
  ingredients?: Array<{ id: string }>;

  @IsOptional()
  @IsArray({ each: true })
  orderItems?: Array<{ id: string }>;
}
