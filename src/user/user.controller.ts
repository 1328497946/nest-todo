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
import { UpdateUserDto } from './dto/update-user.dto';

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
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserInfoById(id, updateUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
