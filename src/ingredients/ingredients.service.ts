import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
import { UpdateIngredientsDto } from './dto/update-ingredients.dto';

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
    return await this.prisma.ingredients.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.ingredients.delete({ where: { id } });
  }

  async update(id: string, data: UpdateIngredientsDto) {
    return await this.prisma.ingredients.update({
      where: { id },
      data,
    });
  }
}
