import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateIngredientsDto, UpdateIngredientsDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService, private paginationHelper: PaginationHelper) {}

  async getOne(id: string) {
    return await this.prisma.ingredients.findUnique({ where: { id } });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.ingredientCategories.findMany({
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
      this.prisma.ingredientCategories.count({
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

  async create(data: CreateIngredientsDto) {
    return await this.prisma.ingredients.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
        unit: data.unit,
        inStock: data.inStock,
        dishes: { connect: data.dishes },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.ingredients.delete({ where: { id } });
  }

  async update(id: string, data: UpdateIngredientsDto) {
    return await this.prisma.ingredients.update({
      where: { id },
      data: {
        name: data.name,
        categoryId: data.categoryId,
        unit: data.unit,
        inStock: data.inStock,
        dishes: { connect: data.dishes },
      },
    });
  }
}
