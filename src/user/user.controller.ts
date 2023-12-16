import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { omit } from 'lodash';
import { UserService } from './user.service';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AbilityFactory } from 'src/ability/ability.factory';
import { Action } from 'src/ability/interface';
import { ForbiddenError } from 'src/ability/ability.factory';
import { GUser } from 'src/decorator/user.decorator';

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
    @GUser() user: User,
  ): Promise<Paginated<User>> {
    const ability = this.abilityFactory.defineAbility(user);
    ForbiddenError.from(ability).throwUnlessCan(Action.Manage, user);
    return this.userService.getUsers(query);
  }

  @Get('/info')
  async getCurrUserInfo(@GUser() user: User) {
    const findUser = await this.userService.getUserById(user.user_id);
    return omit(findUser, ['access_token', 'refresh_token']);
  }

  @Get(':id')
  // 根据user_id查询用户
  async getUserById(@Param('id') id: string, @GUser() user: User) {
    const findUser = await this.userService.getUserById(id);
    if (!findUser) {
      throw new BadRequestException('用户不存在');
    }
    const ability = this.abilityFactory.defineAbility(user);
    ForbiddenError.from(ability).throwUnlessCan(Action.Read, findUser);
    return omit(user, ['access_token', 'refresh_token']);
  }

  @Patch(':id')
  // 根据user_id更改用户信息
  async updateUserInfoById(
    @Param('id') id: string,
    @Body()
    updateUserDto: UpdateUserDto,
    @GUser() user: User,
  ) {
    const findUser = await this.userService.getUserById(id);
    if (!findUser) {
      throw new BadRequestException('该用户不存在');
    }
    const ability = this.abilityFactory.defineAbility(user);
    ForbiddenError.from(ability).throwUnlessCan(Action.Update, findUser);
    return this.userService.updateUserInfoById(findUser, updateUserDto);
  }

  // 更具user_id删除用户
  @Delete(':id')
  async deleteUserById(@Param('id') id: string, @GUser() user: User) {
    const findUser = await this.userService.getUserById(id);
    const ability = this.abilityFactory.defineAbility(user);
    ForbiddenError.from(ability).throwUnlessCan(Action.Delete, findUser);
    if (!findUser) {
      throw new BadRequestException('用户不存在');
    }
    return this.userService.deleteUserById(findUser);
  }
}
