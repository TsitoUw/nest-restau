import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { QueryDto } from 'src/common/dto/query.dto';
import { UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(query: QueryDto) {
    return await this.prisma.users.findMany({
      where: {
        username: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
      skip: query.offset,
      take: query.limit,
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
  }

  async getOne(userId: string) {
    return await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        role: true,
        invoices: true,
      },
    });
  }

  async update(userId: string, data: UpdateUserDto) {
    return await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        username: data.username,
        tablesId: data.tablesId,
        invoices: {connect: data.invoices},
      }
    });
  }
}
