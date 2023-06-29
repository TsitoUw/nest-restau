import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateMenusDto, UpdateMenusDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService, private paginationHelper: PaginationHelper) {}

  async getOne(id: string) {
    return await this.prisma.menus.findUnique({ where: { id } });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.menus.findMany({
        where: {
          name: {
            contains: pagination.filter,
            mode: 'insensitive',
          },
        },
        orderBy: {
          [sanitizedPagination.sort]: sanitizedPagination.order
        },
        skip: skip,
        take: take,
      }),
      this.prisma.menus.count({
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

  async create(data: CreateMenusDto) {
    return await this.prisma.menus.create({
      data: {
        name: data.name,
        menusCategoriesId: data.menusCategoriesId,
        dishes: { connect: data.dishes },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.menus.delete({ where: { id } });
  }

  async update(id: string, data: UpdateMenusDto) {
    return await this.prisma.menus.update({
      where: { id },
      data: {
        name: data.name,
        menusCategoriesId: data.menusCategoriesId,
        dishes: { connect: data.dishes },
      },
    });
  }
}
