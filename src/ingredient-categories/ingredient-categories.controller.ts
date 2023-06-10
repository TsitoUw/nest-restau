import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IngredientCategoriesService } from './ingredient-categories.service';
import { CreateIngretientCategoryDto } from './dto/create-ingredient-categories.dto';
import { UpdateIngretientCategoryDto } from './dto/update-ingredient-categories.dto';

@Controller('ingredient-categories')
export class IngredientCategoriesController {
  constructor(private service: IngredientCategoriesService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Post()
  create(@Body() data: CreateIngretientCategoryDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateIngretientCategoryDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
