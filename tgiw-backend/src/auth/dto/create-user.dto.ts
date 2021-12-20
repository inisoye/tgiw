import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  Equals,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @Equals('user')
  role = 'user';

  @IsOptional()
  @IsString()
  photoURL?: string;

  @IsOptional()
  @IsBoolean()
  disabled?: boolean;
}
