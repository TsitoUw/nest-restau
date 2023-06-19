import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.orders.findUnique({ where: { id } });
  }

  async getAll(query: QueryDto) {
    return await this.prisma.orders.findMany({
      skip: query.offset,
      take: query.limit,
    });
  }

  async create(data: CreateOrdersDto) {
    return await this.prisma.orders.create({
      data: {
        invoiceId: data.invoiceId,
        items: { connect: data.items },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.orders.delete({ where: { id } });
  }

  async update(id: string, data: UpdateOrdersDto) {
    return await this.prisma.orders.update({
      where: { id },
      data: {
        invoiceId: data.invoiceId,
        status: data.status,
        items: { connect: data.items },
      },
    });
  }
}
