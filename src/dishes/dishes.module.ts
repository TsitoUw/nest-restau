import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import { DishesService } from './dishes.service';

@Module({
  controllers: [],
  providers: [PrismaService, DishesService],
})
export class DishesModule {}
