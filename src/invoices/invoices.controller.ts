import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoicesDto } from './dto/create-invoices.dto';
import { UpdateInvoicesDto } from './dto/update-invoices.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private service: InvoicesService) {}

  @Get()
  getAll(@Query() query: QueryDto) {
    return this.service.getAll(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Post()
  create(@Body() data: CreateInvoicesDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateInvoicesDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}