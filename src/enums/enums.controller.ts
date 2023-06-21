import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { EnumsService } from './enums.service';

@Controller('enums')
export class EnumsController {
  constructor(private service: EnumsService) {}

  @Public()
  @Get()
  getAll() {
    return this.service.getAll();
  }
}
