import { IsArray, IsObject, IsOptional } from 'class-validator';

export class UpdateInvoicesDto {
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  orders?: Array<{ id: string }>;
}
