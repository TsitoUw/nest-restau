import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateMenusCategoriesDto, UpdateMenusCategoriesDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';

@Injectable()
export class MenusCategoriesService {
  constructor(private prisma: PrismaService, private paginationHelper: PaginationHelper) {}

  async getOne(id: string) {
    return await this.prisma.menusCategories.findUnique({ where: { id } });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.menusCategories.findMany({
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
      this.prisma.menusCategories.count({
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

  async create(data: CreateMenusCategoriesDto) {
    return await this.prisma.menusCategories.create({
      data: {
        name: data.name,
        menus: { connect: data.menus },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.menusCategories.delete({ where: { id } });
  }

  async update(id: string, data: UpdateMenusCategoriesDto) {
    return await this.prisma.menusCategories.update({
      where: { id },
      data: {
        name: data.name,
        menus: { connect: data.menus },
      },
    });
  }
}
