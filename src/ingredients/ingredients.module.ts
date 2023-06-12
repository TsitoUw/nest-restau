import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import PrismaService from 'src/prisma.service';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService, PrismaService],
})
export class IngredientsModule {}
