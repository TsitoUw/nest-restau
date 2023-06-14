import { DishCategories, Ingredients, Menus, OrderItems } from '@prisma/client';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateDishesDto {
  name: string;
  price: number;

  menusId?: string;
  dishCategories?: string;
}
