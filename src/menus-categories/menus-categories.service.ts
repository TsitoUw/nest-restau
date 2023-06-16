import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateMenusCategoriesDto } from './dto/create-menus-categories.dto';
import { UpdateMenusCategoriesDto } from './dto/update-menus-categories.dto';

@Injectable()
export class MenusCategoriesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.menusCategories.findUnique({ where: { id } });
  }

  async getAll() {
    return await this.prisma.menusCategories.findMany();
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
