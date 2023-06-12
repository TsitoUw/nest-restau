import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DishCategoriesService } from './dish-categories.service';
import { CreateDishCategoryDto } from './dto/create-dish-categories.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-categories.dto';

@Controller('dish-categories')
export class DishCategoriesController {
  constructor(private service: DishCategoriesService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Post()
  create(@Body() data: CreateDishCategoryDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateDishCategoryDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}