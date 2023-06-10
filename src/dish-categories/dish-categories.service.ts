import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import { CreateDishCategoryDto } from './dto/create-dish-categories.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-categories.dto';

@Injectable()
export class DishCategoriesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.dishCategories.findUnique({ where: { id } });
  }

  async getAll() {
    return await this.prisma.dishCategories.findMany();
  }

  async create(data: CreateDishCategoryDto) {
    return await this.prisma.dishCategories.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.dishCategories.delete({ where: { id } });
  }

  async update(id: string, data: UpdateDishCategoryDto) {
    return await this.prisma.dishCategories.update({
      where: { id },
      data,
    });
  }
}
