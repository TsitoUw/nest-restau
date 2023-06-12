import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [PrismaService, OrdersService],
})
export class OrdersModule {}
