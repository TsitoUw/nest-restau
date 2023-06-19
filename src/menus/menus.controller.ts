import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenusDto } from './dto/create-menus.dto';
import { UpdateMenusDto } from './dto/update-menus.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('menus')
export class MenusController {
  constructor(private service: MenusService) {}

  @Get()
  getAll(@Query() query: QueryDto) {
    return this.service.getAll(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Post()
  create(@Body() data: CreateMenusDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param(':id') id: string, @Body() data: UpdateMenusDto) {
    return this.service.update(id, data);
  }
}
