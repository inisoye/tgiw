import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class SearchTracksQueryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  limit?: number;
}
