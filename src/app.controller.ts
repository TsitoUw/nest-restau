import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  get(): string {
    return 'server is up and runing';
  }
}
