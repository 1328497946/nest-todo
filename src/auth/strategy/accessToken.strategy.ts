import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interface';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('accessTokenSecret'),
    });
  }

  async validate(payload: JwtPayload) {
    const { sub: userId } = payload;
    // 校验是否token中的userId用户存在
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return null;
    }
    return payload;
  }
}
