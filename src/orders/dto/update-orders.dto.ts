import { OrderStatuses } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOrdersDto {
  @IsOptional()
  @IsString()
  billId: string;

  @IsOptional()
  @IsString()
  status: OrderStatuses;
}
