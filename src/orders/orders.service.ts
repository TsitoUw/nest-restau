import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateOrdersDto, UpdateOrdersDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService, private paginationHelper: PaginationHelper) {}

  async getOne(id: string) {
    return await this.prisma.order.findUnique({ where: { id } });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const filter = 
      pagination.filter === OrderStatus.CANCELLED ||
      pagination.filter === OrderStatus.COMPLETED ||
      pagination.filter === OrderStatus.DELIVERED ||
      pagination.filter === OrderStatus.IN_DELIVERY ||
      pagination.filter === OrderStatus.IN_PROGRESS ||
      pagination.filter === OrderStatus.ONHOLD ||
      pagination.filter === OrderStatus.PENDING ||
      pagination.filter === OrderStatus.PROCESSING ||
      pagination.filter === OrderStatus.READY_FOR_PICKUP ||
      pagination.filter === OrderStatus.REFUNDED
      
      ? pagination.filter as OrderStatus : undefined
  
    const [data, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
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
      this.prisma.order.count({
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
    return await this.prisma.order.create({
      data: {
        invoiceId: data.invoiceId,
        items: { connect: data.items },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.order.delete({ where: { id } });
  }

  async update(id: string, data: UpdateOrdersDto) {
    return await this.prisma.order.update({
      where: { id },
      data: {
        invoiceId: data.invoiceId,
        status: data.status,
        items: { connect: data.items },
      },
    });
  }
}
