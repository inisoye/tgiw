import { IsString, IsNotEmpty } from 'class-validator';

export class AuthCallbackQueryDto {
  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
