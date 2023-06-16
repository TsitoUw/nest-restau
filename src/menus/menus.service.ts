import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateMenusDto } from './dto/create-menus.dto';
import { UpdateMenusDto } from './dto/update-menus.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.menus.findUnique({ where: { id } });
  }

  async getAll() {
    return await this.prisma.menus.findMany();
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
