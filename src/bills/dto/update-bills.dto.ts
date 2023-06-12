import { IsOptional, IsString } from 'class-validator';

export class UpdateBillsDto {
  @IsOptional()
  @IsString()
  usersId: string;
}
