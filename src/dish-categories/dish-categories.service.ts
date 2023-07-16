import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateDishCategoryDto, UpdateDishCategoryDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';

@Injectable()
export class DishCategoriesService {
  constructor(private prisma: PrismaService, private paginationHelper: PaginationHelper) {}

  async getOne(id: string) {
    return await this.prisma.dishCategory.findUnique({ where: { id } });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.dishCategory.findMany({
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
      this.prisma.dishCategory.count({
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

  async create(data: CreateDishCategoryDto) {
    return await this.prisma.dishCategory.create({
      data: {
        name: data.name,
        dishes: { connect: data.dishes },
      },
    });
  }
  
  async delete(id: string) {
    return await this.prisma.dishCategory.delete({ where: { id } });
  }
  
  async update(id: string, data: UpdateDishCategoryDto) {
    return await this.prisma.dishCategory.update({
      where: { id },
      data: {
        name: data.name,
        dishes: { connect: data.dishes },
      },
    });
  }
}
