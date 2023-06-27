import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators';
import { QueryDto } from 'src/common/dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Roles('ADMIN')
  @Get()
  getAll(@Query() query: QueryDto) {
    return this.service.getAll(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }
}
