import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MenusCategoriesService } from './menus-categories.service';
import { CreateMenusCategoriesDto } from './dto/create-menus-categories.dto';
import { UpdateMenusCategoriesDto } from './dto/update-menus-categories.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('menus-categories')
export class MenusCategoriesController {
  constructor(private service: MenusCategoriesService) {}

  @Get()
  getAll(@Query() query: QueryDto) {
    return this.service.getAll(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Post()
  create(@Body() data: CreateMenusCategoriesDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param(':id') id: string, @Body() data: UpdateMenusCategoriesDto) {
    return this.service.update(id, data);
  }
}
