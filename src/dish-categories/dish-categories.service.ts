import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateDishCategoryDto } from './dto/create-dish-categories.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-categories.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class DishCategoriesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.dishCategories.findUnique({ where: { id } });
  }

  async getAll(query: QueryDto) {
    return await this.prisma.dishCategories.findMany({
      where: {
        name: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
      skip: query.offset,
      take: query.limit,
    });
  }

  async create(data: CreateDishCategoryDto) {
    return await this.prisma.dishCategories.create({
      data: {
        name: data.name,
        dishes: { connect: data.dishes },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.dishCategories.delete({ where: { id } });
  }

  async update(id: string, data: UpdateDishCategoryDto) {
    return await this.prisma.dishCategories.update({
      where: { id },
      data: {
        name: data.name,
        dishes: { connect: data.dishes },
      },
    });
  }
}
