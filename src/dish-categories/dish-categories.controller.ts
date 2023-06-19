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
import { CreateDishCategoryDto } from './dto/create-dish-categories.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-categories.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('dish-categories')
export class DishCategoriesController {
  constructor(private service: DishCategoriesService) {}

  @Get()
  getAll(@Query() paginationQuery: QueryDto) {
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
