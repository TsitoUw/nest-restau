import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateOrdersDto {
  @IsOptional()
  @IsString()
  invoiceId?: string;

  @IsArray()
  @IsObject({ each: true })
  items: Array<{ id: string }>;
}
