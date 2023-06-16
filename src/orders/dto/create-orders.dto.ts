import { IsArray, IsString } from 'class-validator';

export class CreateOrdersDto {
  @IsString()
  invoiceId: string;

  @IsArray({ each: true })
  items: Array<{ id: string }>;
}
