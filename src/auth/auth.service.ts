import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import LoginUserDto from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { name: dto.name },
    });
    const isMatch = await bcrypt.compare(dto.password, user.password);
    const payload = { name: user.name, user_id: user.user_id };
    const token = await this.jwtService.signAsync(payload);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (!isMatch) {
      throw new UnauthorizedException('密码错误');
    }
    return { ...user, token };
  }
}
