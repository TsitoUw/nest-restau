import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateDishesDto, UpdateDishesDto } from './dto';
import { PaginationDto, QueryDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService, private paginationHelper: PaginationHelper) {}

  async getOne(id: string) {
    return await this.prisma.dishes.findUnique({ where: { id } });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.dishes.findMany({
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
      this.prisma.dishes.count({
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

  async create(data: CreateDishesDto) {
    return await this.prisma.dishes.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        menusId: data.menusId,
        dishCategoriesId: data.dishCategoriesId,
        ingredients: { connect: data.ingredients },
        orderItems: { connect: data.orderItems },
        photos: { connect: data.photos },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.dishes.delete({ where: { id } });
  }

  async update(id: string, data: UpdateDishesDto) {
    return await this.prisma.dishes.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        menusId: data.menusId,
        dishCategoriesId: data.dishCategoriesId,
        ingredients: { connect: data.ingredients },
        orderItems: { connect: data.orderItems },
      },
    });
  }
}
