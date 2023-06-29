import { Global, Module } from '@nestjs/common';
import { PaginationHelper } from './helpers';

@Global()
@Module({
  providers: [PaginationHelper],
  exports: [PaginationHelper]
})
export class CommonModule {}
