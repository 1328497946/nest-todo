import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { omit } from 'lodash';
import { UserService } from './user.service';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtPayload } from 'src/auth/interface';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  // 获取所有用户
  // TODO 分页 pagination
  public getUsers(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.userService.getUsers(query);
  }

  @Get('/info')
  async getCurrUserInfo(@Req() req: Request) {
    const payload = req.user as JwtPayload;
    const user = await this.userService.getUserById(payload.sub);
    return omit(user, ['access_token', 'refresh_token']);
  }

  @Get(':id')
  // 根据user_id查询用户
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return omit(user, ['access_token', 'refresh_token']);
  }

  @Patch(':id')
  // 根据user_id更改用户信息
  updateUserInfoById(
    @Param('id') id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserInfoById(id, updateUserDto);
  }

  // 更具user_id删除用户
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
