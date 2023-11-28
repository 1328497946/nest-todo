import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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
        throw new HttpException({ message: '用户名不能为空' }, HttpStatus.OK);
      } else if (!password) {
        throw new HttpException({ message: '密码不能为空' }, HttpStatus.OK);
      }
      throw new InternalServerErrorException('服务器错误');
    }
    return user;
  }
}
