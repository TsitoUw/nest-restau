import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateOrdersDto, UpdateOrdersDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';
import { OrderStatuses } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService, private paginationHelper: PaginationHelper) {}

  async getOne(id: string) {
    return await this.prisma.orders.findUnique({ where: { id } });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const filter = 
      pagination.filter === OrderStatuses.CANCELLED ||
      pagination.filter === OrderStatuses.COMPLETED ||
      pagination.filter === OrderStatuses.DELIVERED ||
      pagination.filter === OrderStatuses.IN_DELIVERY ||
      pagination.filter === OrderStatuses.IN_PROGRESS ||
      pagination.filter === OrderStatuses.ONHOLD ||
      pagination.filter === OrderStatuses.PENDING ||
      pagination.filter === OrderStatuses.PROCESSING ||
      pagination.filter === OrderStatuses.READY_FOR_PICKUP ||
      pagination.filter === OrderStatuses.REFUNDED
      
      ? pagination.filter as OrderStatuses : undefined
  
    const [data, total] = await this.prisma.$transaction([
      this.prisma.orders.findMany({
        where: {
          status: {
            equals: filter
          }
        },
        orderBy: {
          [sanitizedPagination.sort]: sanitizedPagination.order,
        },
        skip: skip,
        take: take,
      }),
      this.prisma.orders.count({
        where: {
          status: {
            equals: filter
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
