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
import { DishCategoriesService } from './dish-categories.service';
import { CreateDishCategoryDto, UpdateDishCategoryDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { Roles } from 'src/common/decorators';

@Controller('dish-categories')
export class DishCategoriesController {
  constructor(private service: DishCategoriesService) {}

  @Get()
  getAll(@Query() paginationQuery: PaginationDto) {
    return this.service.getAll(paginationQuery);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Roles('ADMIN')
  @Post()
  create(@Body() data: CreateDishCategoryDto) {
    return this.service.create(data);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateDishCategoryDto) {
    return this.service.update(id, data);
  }

  @Roles('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
