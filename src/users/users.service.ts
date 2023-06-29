import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private paginationHelper: PaginationHelper,
  ) {}

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.users.findMany({
        where: {
          username: {
            contains: pagination.filter,
            mode: 'insensitive',
          },
        },
        orderBy: {
          [sanitizedPagination.sort]: sanitizedPagination.order
        },
        skip: skip,
        take: take,
        select: {
          id: true,
          username: true,
          role: true,
        },
      }),
      this.prisma.users.count({
        where: {
          username: {
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

  async getOne(userId: string) {
    return await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        role: true,
        invoices: true,
      },
    });
  }

  async update(userId: string, data: UpdateUserDto) {
    return await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        username: data.username,
        tablesId: data.tablesId,
        invoices: { connect: data.invoices },
      },
    });
  }
}
