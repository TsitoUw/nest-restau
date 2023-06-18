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
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { UpdateOrderItemsDto } from './dto/update-order-items.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

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

  @Post()
  create(@Body() data: CreateOrderItemsDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param(':id') id: string, @Body() data: UpdateOrderItemsDto) {
    return this.service.update(id, data);
  }
}
