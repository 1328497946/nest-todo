import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { Redis } from 'ioredis';

@Injectable()
export class accessTokenGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
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
        const tokenPos = await this.redis.lpos('AccessTokenBlacklist', token);
        // 存在黑名单中的话拒绝登录
        if (tokenPos !== null && tokenPos !== -1) return false;
      }
    }
    return super.canActivate(context);
  }
}
