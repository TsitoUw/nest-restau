import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateTablesDto, UpdateTablesDto } from './dto';
import { QueryDto } from 'src/common/dto';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.tables.findUnique({ where: { id } });
  }

  async getAll(query: QueryDto) {
    return await this.prisma.tables.findMany({
      skip: query.offset,
      take: query.limit,
    });
  }

  async create(data: CreateTablesDto) {
    return await this.prisma.tables.create({
      data: data,
    });
  }

  async delete(id: string) {
    return await this.prisma.tables.delete({ where: { id } });
  }

  async update(id: string, data: UpdateTablesDto) {
    return await this.prisma.tables.update({
      where: { id },
      data: data,
    });
  }
}
