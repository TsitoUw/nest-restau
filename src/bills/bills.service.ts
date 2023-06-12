import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import { CreateBillsDto } from './dto/create-bills.dto';
import { UpdateBillsDto } from './dto/update-bills.dto';

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.bills.findUnique({ where: { id } });
  }

  async getAll() {
    return await this.prisma.bills.findMany();
  }

  async create(data: CreateBillsDto) {
    return await this.prisma.bills.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.bills.delete({ where: { id } });
  }

  async update(id: string, data: UpdateBillsDto) {
    return await this.prisma.bills.update({
      where: { id },
      data,
    });
  }
}
