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
import { User } from './entity/user.entity';
import { AbilityFactory } from 'src/ability/ability.factory';
import { Action } from 'src/ability/interface';
import { ForbiddenError } from '@casl/ability';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Get()
  // 获取所有用户
  // TODO 分页 pagination
  public getUsers(
    @Paginate() query: PaginateQuery,
    @Req() req: Request,
  ): Promise<Paginated<User>> {
    const ability = this.abilityFactory.defineAbility(req.user as User);
    ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);
    return this.userService.getUsers(query);
  }

  @Get('/info')
  async getCurrUserInfo(@Req() req: Request) {
    const payload = req.user as User;
    const user = await this.userService.getUserById(payload.user_id);
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
