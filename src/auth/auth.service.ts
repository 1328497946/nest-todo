import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { name } });
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('密码错误');
    }
    return user;
  }

  async login(user: User) {
    const payload = { name: user.name, sub: user.user_id };
    delete user.password;
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
