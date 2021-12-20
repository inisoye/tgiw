import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateUserDto, UpdateUserRoleDto } from './dto';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { GetUserData } from './decorators/get-user-data.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Get('/username-validation/:userName')
  validateUsername(@Param('userName') userName: string): Promise<void> {
    return this.authService.validateUsername(userName);
  }

  @Delete('/users/:id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.authService.deleteUser(id);
  }

  @Get('/users/:id')
  getUser(@Param('id') id: string) {
    return this.authService.getUser(id);
  }

  @Patch('/users/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Patch('/users/role/:id')
  @UseGuards(FirebaseAuthGuard)
  updateUserRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
    @GetUserData('role') role: string,
  ) {
    return this.authService.updateUserRole(id, updateUserRoleDto, role);
  }
}
