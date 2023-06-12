import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Post()
  create(@Body() data: CreateOrdersDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param(':id') id: string, @Body() data: UpdateOrdersDto) {
    return this.service.update(id, data);
  }
}
