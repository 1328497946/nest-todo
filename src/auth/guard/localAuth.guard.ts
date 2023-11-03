import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard as PassAuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends PassAuthGuard('local') {
  // 拦截接口校验必填字段
  handleRequest(err, user, _info, context) {
    const request = context.switchToHttp().getRequest();
    const { name, password } = request.body;
    if (err || !user) {
      if (!name) {
        throw new HttpException({ message: '手机号不能为空' }, HttpStatus.OK);
      } else if (!password) {
        throw new HttpException({ message: '密码不能为空' }, HttpStatus.OK);
      } else {
        throw err || new UnauthorizedException();
      }
    }
    return user;
  }
}
