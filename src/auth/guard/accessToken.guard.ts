import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { Redis } from 'ioredis';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class accessTokenGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly jwtService: JwtService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<any> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    // return super.canActivate(context);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const [bearer, token] = request.headers.authorization.split(' ');
      if (bearer === 'Bearer' && token) {
        const data: any = await this.jwtService.decode(token);
        const valid = await this.redis.exists(
          `${data.sub}:AccessToken:${token}`,
        );
        if (valid) {
          return super.canActivate(context);
        }
        return false;
      }
    }
    return super.canActivate(context);
  }
}
