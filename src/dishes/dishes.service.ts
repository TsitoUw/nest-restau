import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateDishesDto, UpdateDishesDto } from './dto';
import { QueryDto } from 'src/common/dto';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.dishes.findUnique({ where: { id } });
  }

  async getAll(query: QueryDto) {
    return await this.prisma.dishes.findMany({
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

  async create(data: CreateDishesDto) {
    return await this.prisma.dishes.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        menusId: data.menusId,
        dishCategoriesId: data.dishCategoriesId,
        ingredients: { connect: data.ingredients },
        orderItems: { connect: data.orderItems },
        photos: { connect: data.photos },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.dishes.delete({ where: { id } });
  }

  async update(id: string, data: UpdateDishesDto) {
    return await this.prisma.dishes.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        menusId: data.menusId,
        dishCategoriesId: data.dishCategoriesId,
        ingredients: { connect: data.ingredients },
        orderItems: { connect: data.orderItems },
      },
    });
  }
}
