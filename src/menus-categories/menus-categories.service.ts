import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateMenusCategoriesDto, UpdateMenusCategoriesDto } from './dto';
import { QueryDto } from 'src/common/dto';

@Injectable()
export class MenusCategoriesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.menusCategories.findUnique({ where: { id } });
  }

  async getAll(query: QueryDto) {
    return await this.prisma.menusCategories.findMany({
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
