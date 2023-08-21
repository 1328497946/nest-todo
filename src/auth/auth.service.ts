import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signIn(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { name: dto.name },
    });
    // console.log(user.password, dto.password);
    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    return user;
  }
}
