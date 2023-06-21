import { Module } from '@nestjs/common';
import { EnumsService } from './enums.service';
import { EnumsController } from './enums.controller';

@Module({
  providers: [EnumsService],
  controllers: [EnumsController]
})
export class EnumsModule {}
