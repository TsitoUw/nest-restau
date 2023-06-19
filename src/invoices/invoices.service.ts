import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateInvoicesDto, UpdateInvoicesDto } from './dto';
import { QueryDto } from 'src/common/dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.invoices.findUnique({
      where: { id },
      include: { orders: true },
    });
  }

  async getAll(query: QueryDto) {
    return await this.prisma.invoices.findMany({
      skip: query.offset,
      take: query.limit,
    });
  }

  async create(data: CreateInvoicesDto) {
    return await this.prisma.invoices.create({
      data: {
        usersId: data.usersId,
        orders: { connect: data.orders },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.invoices.delete({ where: { id } });
  }

  async update(id: string, data: UpdateInvoicesDto) {
    return await this.prisma.invoices.update({
      where: { id },
      data: {
        orders: { connect: data.orders },
      },
    });
  }
}
