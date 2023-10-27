import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async validateUser(name: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { name } });
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
    const tokens = await this.getTokens(payload);
    this.updateRefreshToken(user.user_id, tokens.refresh_token);
    delete user.password;
    return {
      ...user,
      ...tokens,
    };
  }

  // async signup() {}

  async logout(userId: string) {
    return this.userService.updateUserInfoById(userId, { refresh_token: null });
  }

  async refreshTokens(userId: string, refresh_token: string) {
    const user = await this.userService.getUserById(userId);
    if (!user || !user.refresh_token) {
      throw new ForbiddenException('Access Denied');
    }
    const isMatch = bcrypt.compareSync(refresh_token, user.refresh_token);
    if (!isMatch) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens({ name: user.name, sub: user.user_id });
    await this.updateRefreshToken(user.user_id, tokens.refresh_token);
    return tokens;
  }

  // 生成Token和refreshToken
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
  async updateRefreshToken(userId: string, token: string) {
    const hashedRefreshToken = this.hashData(token);
    await this.userService.updateUserInfoById(userId, {
      refresh_token: hashedRefreshToken,
    });
  }
}
