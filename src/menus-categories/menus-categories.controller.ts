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
import { CreateMenusCategoriesDto, UpdateMenusCategoriesDto } from './dto';
import { QueryDto } from 'src/common/dto';
import { Roles } from 'src/common/decorators';

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

  @Roles('ADMIN')
  @Post()
  create(@Body() data: CreateMenusCategoriesDto) {
    return this.service.create(data);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param(':id') id: string, @Body() data: UpdateMenusCategoriesDto) {
    return this.service.update(id, data);
  }
}
