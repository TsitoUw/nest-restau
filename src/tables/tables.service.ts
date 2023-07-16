import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateTablesDto, UpdateTablesDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';

@Injectable()
export class TablesService {
  constructor(
    private prisma: PrismaService,
    private paginationHelper: PaginationHelper,
  ) {}

  async getOne(id: string) {
    return await this.prisma.table.findUnique({ where: { id } });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.table.findMany({
        where: {
          name: {
            contains: pagination.filter,
            mode: 'insensitive',
          },
        },
        orderBy: {
          [sanitizedPagination.sort]: sanitizedPagination.order,
        },
        skip: skip,
        take: take,
      }),
      this.prisma.table.count({
        where: {
          name: {
            contains: pagination.filter,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return {
      data,
      page: sanitizedPagination.page,
      limit: sanitizedPagination.limit,
      total,
    };
  }

  async create(data: CreateTablesDto) {
    return await this.prisma.table.create({
      data: data,
    });
  }

  async delete(id: string) {
    return await this.prisma.table.delete({ where: { id } });
  }

  async update(id: string, data: UpdateTablesDto) {
    return await this.prisma.table.update({
      where: { id },
      data: data,
    });
  }
}
