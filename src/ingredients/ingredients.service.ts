import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
import { UpdateIngredientsDto } from './dto/update-ingredients.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    return await this.prisma.ingredients.findUnique({ where: { id } });
  }

  async getAll(query: QueryDto) {
    return await this.prisma.ingredients.findMany({
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
