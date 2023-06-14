import { IsNumber, IsString } from 'class-validator';

export class UpdateDishesDto {
  @IsString()
  name?: string;

  @IsString()
  dishCategoriesId?: string;

  @IsNumber()
  price?: number;

  @IsString()
  menusId?: string;
}
