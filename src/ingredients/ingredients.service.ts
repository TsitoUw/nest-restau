import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
import { UpdateIngredientsDto } from './dto/update-ingredients.dto';
import { connect } from 'http2';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.ingredients.findUnique({ where: { id } });
  }

  async getAll() {
    return await this.prisma.ingredients.findMany();
  }

  async create(data: CreateIngredientsDto) {
    return await this.prisma.ingredients.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
        dishes: { connect: data.dishes },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.ingredients.delete({ where: { id } });
  }

  async update(id: string, data: UpdateIngredientsDto) {
    return await this.prisma.ingredients.update({
      where: { id },
      data: {
        name: data.name,
        categoryId: data.categoryId,
        dishes: { connect: data.dishes },
      },
    });
  }
}
