import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateInvoicesDto } from './dto/create-invoices.dto';
import { UpdateInvoicesDto } from './dto/update-invoices.dto';
import { Invoices } from '@prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string): Promise<Invoices> {
    return await this.prisma.invoices.findUnique({
      where: { id },
      include: { orders: true },
    });
  }

  async getAll() {
    return await this.prisma.invoices.findMany();
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

  async update(id: string, data: UpdateInvoicesDto): Promise<Invoices> {
    return await this.prisma.invoices.update({
      where: { id },
      data: {
        orders: { connect: data.orders },
      },
    });
  }
}
