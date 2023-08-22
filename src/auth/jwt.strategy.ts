import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.access_token_secret,
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
    delete user.password;
    return { ...user };
  }
}
