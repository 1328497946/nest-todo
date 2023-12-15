import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Redis } from 'ioredis';

@Injectable()
export class refreshTokenGuard extends AuthGuard('jwt-refresh-token') {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly jwtService: JwtService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<any> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    // return super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const [bearer, token] = request.headers.authorization.split(' ');
      if (bearer === 'Bearer' && token) {
        const data: any = await this.jwtService.decode(token);
        const valid = await this.redis.exists(
          `${data.sub}:RefreshToken:${token}`,
        );
        if (valid) {
          return super.canActivate(context);
        }
        throw new UnauthorizedException('RefreshToken无效');
      }
    }
    return super.canActivate(context);
  }
}
