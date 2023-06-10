import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { UpdateOrderItemsDto } from './dto/update-order-items.dto';

@Controller('ingredients')
export class OrderItemsController {
  constructor(private service: OrderItemsService) {}

  @Get()
  getAll() {
    return this.service.getAll();
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
