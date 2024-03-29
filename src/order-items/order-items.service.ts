import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateOrderItemsDto, UpdateOrderItemsDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';

@Injectable()
export class OrderItemsService {
  constructor(
    private prisma: PrismaService,
    private paginationHelper: PaginationHelper,
  ) {}

  async getOne(id: string) {
    return await this.prisma.orderItem.findUnique({ where: { id } });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.orderItem.findMany({
        where: {
          dish: {
            name: {
              contains: pagination.filter,
              mode: 'insensitive',
            },
          },
        },
        orderBy: {
          [sanitizedPagination.sort]: sanitizedPagination.order,
        },
        skip: skip,
        take: take,
      }),
      this.prisma.orderItem.count({
        where: {
          dish: {
            name: {
              contains: pagination.filter,
              mode: 'insensitive',
            },
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

  async create(data: CreateOrderItemsDto) {
    return await this.prisma.orderItem.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.orderItem.delete({ where: { id } });
  }

  async update(id: string, data: UpdateOrderItemsDto) {
    return await this.prisma.orderItem.update({
      where: { id },
      data,
    });
  }
}
