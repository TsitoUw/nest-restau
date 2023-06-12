import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.orders.findUnique({ where: { id } });
  }

  async getAll() {
    return await this.prisma.orders.findMany();
  }

  async create(data: CreateOrdersDto) {
    return await this.prisma.orders.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.orders.delete({ where: { id } });
  }

  async update(id: string, data: UpdateOrdersDto) {
    return await this.prisma.orders.update({
      where: { id },
      data,
    });
  }
}
