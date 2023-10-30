import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('refreshTokenSecret'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refresh_token = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refresh_token };
  }
}
