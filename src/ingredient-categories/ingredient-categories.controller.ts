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
import { IngredientCategoriesService } from './ingredient-categories.service';
import { CreateIngredientCategoryDto } from './dto/create-ingredient-categories.dto';
import { UpdateIngredientCategoryDto } from './dto/update-ingredient-categories.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('ingredient-categories')
export class IngredientCategoriesController {
  constructor(private service: IngredientCategoriesService) {}

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
  create(@Body() data: CreateIngredientCategoryDto) {
    return this.service.create(data);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateIngredientCategoryDto) {
    return this.service.update(id, data);
  }

  @Roles('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
