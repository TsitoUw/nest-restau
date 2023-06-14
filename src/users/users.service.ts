import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import PrismaService from 'src/prisma.service';
import { Roles } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    if (data.role === Roles.CLIENT) {
      const res = await this.prisma.users.create({
        data,
        select: {
          id: true,
          username: true,
          role: true,
        },
      });
      return res;
    } else {
      if (!data.password)
        throw new HttpException(
          'Password is required for admin account',
          HttpStatus.EXPECTATION_FAILED,
        );
      const hash = data.password;
      const newData = { ...data, password: hash };
      const res = await this.prisma.users.create({
        data: newData,
        select: {
          id: true,
          username: true,
          role: true,
        },
      });
      return res;
    }
  }
}
