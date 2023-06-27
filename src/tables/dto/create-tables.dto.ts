import { IsBoolean, IsString } from 'class-validator';

export class CreateTablesDto {
  @IsString()
  name: string;

  @IsBoolean()
  isVip: boolean;
}
