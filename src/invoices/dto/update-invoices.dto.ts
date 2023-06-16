import { IsArray, IsOptional } from 'class-validator';

export class UpdateInvoicesDto {
  @IsOptional()
  @IsArray({ each: true })
  orders?: Array<{ id: string }>;
}
