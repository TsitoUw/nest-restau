import { Module } from '@nestjs/common';
import { IngredientCategoriesController } from './ingredient-categories.controller';
import { IngredientCategoriesService } from './ingredients.service';
import PrismaService from 'src/prisma.service';

@Module({
  controllers: [IngredientCategoriesController],
  providers: [IngredientCategoriesService, PrismaService],
})
export class IngredientsModule {}
