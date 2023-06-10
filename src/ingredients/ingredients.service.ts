import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import { CreateIngredientCategoryDto } from './dto/create-ingredients.dto';
import { UpdateIngredientCategoryDto } from './dto/update-ingredients.dto';

@Injectable()
export class IngredientCategoriesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.ingredientCategories.findUnique({ where: { id } });
  }

  async getAll() {
    return await this.prisma.ingredientCategories.findMany();
  }

  async create(data: CreateIngredientCategoryDto) {
    return await this.prisma.ingredientCategories.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.ingredientCategories.delete({ where: { id } });
  }

  async update(id: string, data: UpdateIngredientCategoryDto) {
    return await this.prisma.ingredientCategories.update({
      where: { id },
      data,
    });
  }
}
