import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard as PassAuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends PassAuthGuard('local') {
  // 拦截接口校验必填字段
  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    const { name, password } = request.body;
    if (err) {
      throw err;
    } else if (!user) {
      if (!name) {
        throw new BadRequestException({ message: '用户名不能为空' });
      } else if (!password) {
        throw new BadRequestException({ message: '密码不能为空' });
      }
      throw new UnauthorizedException(info);
    }
    return user;
  }
}
