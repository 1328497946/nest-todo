import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  // 创建用户
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { name: createUserDto.name },
    });
    if (existingUser) {
      throw new ConflictException('用户已经存在');
    }
    const saltOrRounds = this.configService.get('saltOrRounds');
    const { password, ...rest } = createUserDto;
    const salt = bcrypt.genSaltSync(saltOrRounds);
    const hash = bcrypt.hashSync(password, salt);
    Object.assign(rest, { password: hash });
    const newUser = await this.userRepository.create(rest);
    return await this.userRepository.save(newUser);
  }

  // 获取用户列表
  getUsers() {
    return this.userRepository.find();
  }

  // 根据ID获取用户
  async getUserById(user_id: string) {
    return await this.userRepository.findOne({ where: { user_id } });
  }

  // 通过user_id(UUID)
  async updateUserInfoById(
    userId: string,
    updateUserDto: UpdateUserDto | CreateUserDto,
  ) {
    if (Object.keys(updateUserDto).length === 0) {
      return;
    }
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) {
      return '该用户不存在';
    }
    await this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async deleteUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      return '该用户不存在';
    }
    return await this.userRepository.remove(user);
  }
}
