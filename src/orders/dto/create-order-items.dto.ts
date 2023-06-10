import { IsNumber, IsString } from 'class-validator';

export class CreateOrderItemsDto {
  @IsNumber()
  quantity: number;

  @IsString()
  dishesId: string;

  @IsString()
  ordersId: string;
}
