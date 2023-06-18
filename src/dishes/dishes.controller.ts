import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishesDto } from './dto/create-dishes.dto';
import { UpdateDishesDto } from './dto/update-dishes.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

@Controller('dishes')
export class DishesController {
  constructor(private service: DishesService) {}

  @Get()
  getAll(@Query() query: QueryDto) {
    return this.service.getAll(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Post()
  create(@Body() data: CreateDishesDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param(':id') id: string, @Body() data: UpdateDishesDto) {
    return this.service.update(id, data);
  }
}
