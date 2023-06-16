import { IsArray, IsString } from 'class-validator';

export class CreateInvoicesDto {
  @IsString()
  usersId: string;

  @IsArray({ each: true })
  orders: Array<{ id: string }>;
}
