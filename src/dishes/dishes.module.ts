import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';

@Module({
  controllers: [DishesController],
  providers: [PrismaService, DishesService],
})
export class DishesModule {}
