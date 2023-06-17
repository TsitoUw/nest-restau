import { IsArray, IsObject, IsString } from 'class-validator';

export class CreateInvoicesDto {
  @IsString()
  usersId: string;

  @IsArray()
  @IsObject({ each: true })
  orders: Array<{ id: string }>;
}
