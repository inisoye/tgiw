import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class SearchTracksDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  limit?: number;
}
