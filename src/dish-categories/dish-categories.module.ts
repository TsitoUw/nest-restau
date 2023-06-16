import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { DishCategoriesController } from './dish-categories.controller';
import { DishCategoriesService } from './dish-categories.service';

@Module({
  controllers: [DishCategoriesController],
  providers: [DishCategoriesService, PrismaService],
})
export class DishCategoriesModule {}
