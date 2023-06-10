import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';

@Module({
  controllers: [MenusController],
  providers: [PrismaService, MenusService],
})
export class MenusModule {}
