import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishesDto, UpdateDishesDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { Roles } from 'src/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('dishes')
export class DishesController {
  constructor(private service: DishesService) {}

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
  @UseInterceptors(FileInterceptor('files'))
  create(@UploadedFiles() files : Express.Multer.File[], @Body() data: CreateDishesDto) {
    console.log(files)
    return this.service.create(data);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param(':id') id: string, @Body() data: UpdateDishesDto) {
    return this.service.update(id, data);
  }
}
