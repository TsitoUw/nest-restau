import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateIngredientCategoryDto } from './dto/create-ingredient-categories.dto';
import { UpdateIngredientCategoryDto } from './dto/update-ingredient-categories.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class IngredientCategoriesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.ingredientCategories.findUnique({ where: { id } });
  }

  async getAll(query: QueryDto) {
    return await this.prisma.ingredientCategories.findMany({
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

  async create(data: CreateIngredientCategoryDto) {
    return await this.prisma.ingredientCategories.create({
      data: {
        name: data.name,
        ingredients: { connect: data.ingredients },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.ingredientCategories.delete({ where: { id } });
  }

  async update(id: string, data: UpdateIngredientCategoryDto) {
    return await this.prisma.ingredientCategories.update({
      where: { id },
      data: {
        name: data.name,
        ingredients: { connect: data.ingredients },
      },
    });
  }
}
