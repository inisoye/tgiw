import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class PaginatedQueryDto {
  @IsOptional()
  @IsNumberString()
  take?: number;

  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsString()
  filter?: string;
}
