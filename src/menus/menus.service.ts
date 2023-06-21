import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateMenusDto, UpdateMenusDto } from './dto';
import { QueryDto } from 'src/common/dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.menus.findUnique({ where: { id } });
  }

  async getAll(query: QueryDto) {
    return await this.prisma.menus.findMany({
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

  async create(data: CreateMenusDto) {
    return await this.prisma.menus.create({
      data: {
        name: data.name,
        menusCategoriesId: data.menusCategoriesId,
        dishes: { connect: data.dishes },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.menus.delete({ where: { id } });
  }

  async update(id: string, data: UpdateMenusDto) {
    return await this.prisma.menus.update({
      where: { id },
      data: {
        name: data.name,
        menusCategoriesId: data.menusCategoriesId,
        dishes: { connect: data.dishes },
      },
    });
  }
}
