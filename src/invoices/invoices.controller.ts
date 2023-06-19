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
import { CreateInvoicesDto, UpdateInvoicesDto } from './dto';
import { QueryDto } from 'src/common/dto';
import { Roles } from 'src/common/decorators';

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

  @Roles('ADMIN')
  @Post()
  create(@Body() data: CreateInvoicesDto) {
    return this.service.create(data);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateInvoicesDto) {
    return this.service.update(id, data);
  }

  @Roles('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
