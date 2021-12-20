import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../role.enum';

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
