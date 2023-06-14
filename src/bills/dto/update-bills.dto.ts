import { IsString } from 'class-validator';

export class UpdateBillsDto {
  @IsString()
  usersId?: string;
}
