import { OrderStatuses } from '@prisma/client';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateOrdersDto {
  @IsOptional()
  @IsString()
  status?: OrderStatuses;

  @IsOptional()
  @IsString()
  invoiceId?: string;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  items?: Array<{ id: string }>;
}
