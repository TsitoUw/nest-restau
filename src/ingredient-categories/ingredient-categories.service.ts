import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import {
  CreateIngredientCategoryDto,
  UpdateIngredientCategoryDto,
} from './dto';
import { PaginationDto } from 'src/common/dto';
import { PaginationHelper } from 'src/common/helpers';

@Injectable()
export class IngredientCategoriesService {
  constructor(private prisma: PrismaService, private paginationHelper: PaginationHelper) {}

  async getOne(id: string) {
    return await this.prisma.ingredientCategory.findUnique({ where: { id } });
  }

  async getAll(pagination: PaginationDto) {
    const sanitizedPagination =
      this.paginationHelper.sanitizePaginationParams(pagination);
    const skip = this.paginationHelper.calculateSkip(sanitizedPagination);
    const take = this.paginationHelper.calculateTake(sanitizedPagination);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.ingredientCategory.findMany({
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
      this.prisma.ingredientCategory.count({
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

  async create(data: CreateIngredientCategoryDto) {
    return await this.prisma.ingredientCategory.create({
      data: {
        name: data.name,
        ingredients: { connect: data.ingredients },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.ingredientCategory.delete({ where: { id } });
  }

  async update(id: string, data: UpdateIngredientCategoryDto) {
    return await this.prisma.ingredientCategory.update({
      where: { id },
      data: {
        name: data.name,
        ingredients: { connect: data.ingredients },
      },
    });
  }
}
