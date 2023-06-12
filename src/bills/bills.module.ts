import { Module } from '@nestjs/common';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import PrismaService from 'src/prisma.service';

@Module({
  controllers: [BillsController],
  providers: [BillsService, PrismaService],
})
export class BillsModules {}
