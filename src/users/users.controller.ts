import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Roles('ADMIN')
  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get()
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }
}
