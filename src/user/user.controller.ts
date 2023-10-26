import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post()
  createUser(
    @Body(
      new ValidationPipe({
        // 删除不是给定dto的字段
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  updateUserInfoById(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserInfoById(id, updateUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
