import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';

@Module({
  controllers: [OrderItemsController],
  providers: [PrismaService, OrderItemsService],
})
export class OrderItemsModule {}
