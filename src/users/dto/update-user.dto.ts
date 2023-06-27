import { Optional } from '@nestjs/common';
import { IsArray, IsString } from 'class-validator';

export class UpdateUserDto {
  @Optional()
  @IsString()
  username?: string;

  @Optional()
  @IsString()
  tablesId?: string;

  @Optional()
  @IsArray()
  @IsString({ each: true })
  invoices?: Array<{ id: string }>;
}
