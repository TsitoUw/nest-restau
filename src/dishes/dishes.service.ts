import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateDishesDto } from './dto/create-dishes.dto';
import { UpdateDishesDto } from './dto/update-dishes.dto';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.dishes.findUnique({ where: { id } });
  }

  async getAll() {
    return await this.prisma.dishes.findMany();
  }

  async create(data: CreateDishesDto) {
    return await this.prisma.dishes.create({
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
