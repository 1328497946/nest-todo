import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Get,
  Req,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guard/auth.guard';
import { refreshTokenGuard } from './guard/refreshToken.guard';
import { Request } from 'express';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  signIn(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
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

  @Get('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.user['sub']);
  }

  @Public()
  @Get('refreshToken')
  @UseGuards(refreshTokenGuard)
  refreshToken(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refresh_token'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
