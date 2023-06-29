import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateInvoicesDto, UpdateInvoicesDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';

@Injectable()
export class InvoicesService {
  constructor(
    private prisma: PrismaService,
    private paginationHelper: PaginationHelper,
  ) {}

  async getOne(id: string) {
    return await this.prisma.invoices.findUnique({
      where: { id },
      include: { orders: true },
    });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.invoices.findMany({
        where: {
          users: {
            username: {
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
      this.prisma.invoices.count({
        where: {
          users: {
            username: {
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
