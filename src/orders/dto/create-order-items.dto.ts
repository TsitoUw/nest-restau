import { OrderStatuses } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateOrderItemsDto {
  @IsString()
  billId: string;

  @IsString()
  status: OrderStatuses;
}
