import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return 'Hello from users';
  }

  @Post()
  async signup(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
}
