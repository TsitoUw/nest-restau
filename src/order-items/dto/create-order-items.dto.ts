import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderItemsDto {
  @IsNumber()
  quantity: number;

  @IsString()
  dishesId: string;

  @IsOptional()
  @IsString()
  ordersId?: string;
}
