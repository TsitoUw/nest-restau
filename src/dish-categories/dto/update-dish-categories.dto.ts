import { IsString } from 'class-validator';

export class UpdateDishCategoryDto {
  @IsString()
  name: string;
}
