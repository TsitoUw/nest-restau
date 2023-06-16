import { OrderStatuses } from '@prisma/client';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateOrdersDto {
  @IsOptional()
  @IsString()
  invoiceId?: string;

  @IsOptional()
  @IsString()
  status?: OrderStatuses;

  @IsOptional()
  @IsArray({ each: true })
  items?: Array<{ id: string }>;
}
