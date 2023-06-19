import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { UpdateOrderItemsDto } from './dto/update-order-items.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class OrderItemsService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.orderItems.findUnique({ where: { id } });
  }

  async getAll(query: QueryDto) {
    return await this.prisma.orderItems.findMany({
      skip: query.offset,
      take: query.limit,
    });
  }

  async create(data: CreateOrderItemsDto) {
    return await this.prisma.orderItems.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.orderItems.delete({ where: { id } });
  }

  async update(id: string, data: UpdateOrderItemsDto) {
    return await this.prisma.orderItems.update({
      where: { id },
      data,
    });
  }
}
