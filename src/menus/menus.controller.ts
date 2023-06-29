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
import { CreateMenusDto, UpdateMenusDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { Roles } from 'src/common/decorators';

@Controller('menus')
export class MenusController {
  constructor(private service: MenusService) {}

  @Get()
  getAll(@Query() query: PaginationDto) {
    return this.service.getAll(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Roles('ADMIN')
  @Post()
  create(@Body() data: CreateMenusDto) {
    return this.service.create(data);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param(':id') id: string, @Body() data: UpdateMenusDto) {
    return this.service.update(id, data);
  }
}
