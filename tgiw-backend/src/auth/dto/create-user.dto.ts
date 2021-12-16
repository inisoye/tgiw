import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsBoolean()
  emailVerified: boolean;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsOptional()
  @IsString()
  photoURL?: string;

  @IsOptional()
  @IsBoolean()
  disabled?: boolean;
}
