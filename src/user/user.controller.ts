import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  updateUserInfoById(
    @Param('id') id: string,
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ) {
    return this.userService.updateUserInfoById(id, createUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
