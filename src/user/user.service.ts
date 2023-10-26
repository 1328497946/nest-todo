import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // 创建用户
  async createUser(createUserDto: CreateUserDto) {
    try {
      const saltOrRounds = 10;
      const { password, ...rest } = createUserDto;
      const salt = bcrypt.genSaltSync(saltOrRounds);
      const hash = bcrypt.hashSync(password, salt);
      Object.assign(rest, { password: hash });
      const newUser = await this.userRepository.create(rest);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('服务器错误');
    }
  }

  // 获取用户列表
  getUsers() {
    return this.userRepository.find();
  }

  // 根据ID获取用户
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user ? user : '用户不存在';
  }

  async updateUserInfoById(id: number, updateUserDto: UpdateUserDto) {
    if (Object.keys(updateUserDto).length === 0) {
      console.log('没有任何变更');
      return;
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return '该用户不存在';
    }
    await this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async deleteUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return '该用户不存在';
    }
    return await this.userRepository.remove(user);
  }
}
