import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderItemsDto {
  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  dishesId: string;

  @IsOptional()
  @IsString()
  ordersId: string;
}
