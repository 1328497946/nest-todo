import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('accessTokenSecret'),
    });
  }

  async validate(payload: JwtPayload) {
    const { sub: userId } = payload;
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) {
      return null;
    }
    return payload;
  }
}
