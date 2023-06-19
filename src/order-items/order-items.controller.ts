import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemsDto, UpdateOrderItemsDto } from './dto';
import { QueryDto } from 'src/common/dto';
import { Roles } from 'src/common/decorators';

@Controller('order-items')
export class OrderItemsController {
  constructor(private service: OrderItemsService) {}

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
  create(@Body() data: CreateOrderItemsDto) {
    return this.service.create(data);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param(':id') id: string, @Body() data: UpdateOrderItemsDto) {
    return this.service.update(id, data);
  }
}
