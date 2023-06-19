import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import PrismaService from 'src/prisma/prisma.service';
import { Roles } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.users.findMany({});
  }

  async getOne(userId: string) {
    return await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
