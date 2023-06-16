import { Module } from '@nestjs/common';
import { MenusCategoriesController } from './menus-categories.controller';
import { MenusCategoriesService } from './menus-categories.service';

@Module({
  controllers: [MenusCategoriesController],
  providers: [MenusCategoriesService],
})
export class MenusCategoriesModule {}
