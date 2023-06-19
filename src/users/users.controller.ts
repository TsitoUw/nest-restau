import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get()
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }
}
