import { OrderStatuses } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateOrdersDto {
  @IsString()
  billId: string;

  @IsString()
  status: OrderStatuses;
}
