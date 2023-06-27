import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTablesDto, UpdateTablesDto } from './dto';
import { QueryDto } from 'src/common/dto';
import { Roles } from 'src/common/decorators';

@Controller('tables')
export class TablesController {
  constructor(private service: TablesService) {}

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
  create(@Body() data: CreateTablesDto) {
    return this.service.create(data);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param(':id') id: string, @Body() data: UpdateTablesDto) {
    return this.service.update(id, data);
  }
}
