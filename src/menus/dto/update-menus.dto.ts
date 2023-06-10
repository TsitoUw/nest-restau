import { IsOptional, IsString } from 'class-validator';

export class UpdateMenusDto {
  @IsOptional()
  @IsString()
  name: string;
}
