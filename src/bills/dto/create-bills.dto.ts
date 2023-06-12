import { IsString } from 'class-validator';

export class CreateBillsDto {
  @IsString()
  usersId: string;
}
