import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interface';
import { Redis } from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  async validateUser(name: string, password: string): Promise<User> {
    const user = await this.userService.getUserByName(name, true);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('密码错误');
    }
    return user;
  }

  async login(user: User) {
    const payload = { name: user.name, sub: user.user_id };
    // 重复调用login接口需要将之前的accessToken和refreshToken重redis中删除
    // 挤掉登录的情况
    if (user.access_token) {
      await this.redis.del(`${user.user_id}:AccessToken:${user.access_token}`);
    }
    if (user.refresh_token) {
      await this.redis.del(
        `${user.user_id}:RefreshToken:${user.refresh_token}`,
      );
    }
    const tokens = await this.getTokens(payload);
    const data: any = await this.jwtService.decode(tokens.access_token, {
      complete: true,
    });
    await this.redis.setex(
      `${user.user_id}:AccessToken:${tokens.access_token}`,
      data.payload.exp - Math.floor(new Date().getTime() / 1000),
      tokens.access_token,
    );
    await this.userService.updateUserInfoById(user, {
      access_token: tokens.access_token,
    });
    this.updateRefreshToken(user, tokens.refresh_token);
    delete user.password;
    return {
      ...user,
      ...tokens,
    };
  }

  async logout(userId: string) {
    const user = await this.userService.getUserById(userId);
    const refresh_token = user.refresh_token;
    const access_token = user.access_token;
    // 将用户的access_token和refresh_token从redis中删除
    if (access_token) {
      await this.redis.del(
        `${userId}:AccessToken:${access_token}`,
        access_token,
      );
    }
    if (refresh_token) {
      await this.redis.del(
        `${userId}:RefreshToken:${refresh_token}`,
        refresh_token,
      );
    }
    this.userService.updateUserInfoById(user, {
      access_token: null,
      refresh_token: null,
    });
    return '退出成功';
  }

  async refreshTokens(user: User) {
    // 将用户的access_token从redis中删除
    if (user.access_token) {
      await this.redis.del(`${user.user_id}:AccessToken:${user.access_token}`);
    }
    const token = await this.getAccessToken({
      name: user.name,
      sub: user.user_id,
    });
    const data: any = await this.jwtService.decode(token, {
      complete: true,
    });
    await this.redis.setex(
      `${user.user_id}:AccessToken:${token}`,
      data.payload.exp - Math.floor(new Date().getTime() / 1000),
      token,
    );
    await this.userService.updateUserInfoById(user, {
      access_token: token,
    });
    return { access_token: token };
  }

  // 生成accessToken
  async getAccessToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('accessTokenSecret'),
      expiresIn: this.configService.get<string>('accessTokenExpired'),
    });
  }

  // 生成accessToken和refreshToken
  async getTokens(payload: JwtPayload) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('accessTokenSecret'),
        expiresIn: this.configService.get<string>('accessTokenExpired'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('refreshTokenSecret'),
        expiresIn: this.configService.get<string>('refreshTokenExpired'),
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  hashData(data: string) {
    return bcrypt.hashSync(
      data,
      this.configService.get<string>('saltOrRounds'),
    );
  }

  // 更新数据库用户的refreshToken
  async updateRefreshToken(user: User, token: string) {
    const data: any = await this.jwtService.decode(token, {
      complete: true,
    });
    await this.redis.setex(
      `${user.user_id}:RefreshToken:${token}`,
      data.payload.exp - Math.floor(new Date().getTime() / 1000),
      token,
    );
    await this.userService.updateUserInfoById(user, {
      refresh_token: token,
    });
  }
}
