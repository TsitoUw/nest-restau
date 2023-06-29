import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators';
import { PaginationDto, QueryDto } from 'src/common/dto';
import { UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Roles('ADMIN')
  @Get()
  getAll(@Query() pagination: PaginationDto) {
    return this.service.getAll(pagination);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.service.update(id, data);
  }
}
