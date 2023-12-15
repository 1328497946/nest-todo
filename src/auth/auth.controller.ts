import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { LocalAuthGuard } from './guard/localAuth.guard';
import { refreshTokenGuard } from './guard/refreshToken.guard';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { GUser } from 'src/decorator/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  // 登录
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  signIn(@GUser() user: User) {
    return this.authService.login(user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  // 注册
  @Post('signup')
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Get('logout')
  // 退出
  logout(@GUser() user: User) {
    return this.authService.logout(user);
  }

  @Public()
  // 刷新accessToken
  @Get('refreshToken')
  @UseGuards(refreshTokenGuard)
  refreshToken(@GUser() user: User) {
    return this.authService.refreshTokens(user);
  }
}
