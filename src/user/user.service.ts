import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  paginate,
  Paginated,
} from 'nestjs-paginate';
import { Redis } from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  // 创建用户
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.getUserByName(createUserDto.name);
    if (existingUser) {
      throw new ConflictException('用户已存在');
    }
    const saltOrRounds = this.configService.get('saltOrRounds');
    const { password, ...rest } = createUserDto;
    const salt = bcrypt.genSaltSync(saltOrRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await this.userRepository.create({
      ...rest,
      password: hash,
    });
    await this.userRepository.save(newUser);
    return '注册成功';
  }

  // 获取用户列表
  getUsers(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id', 'name', 'age'],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name', 'age'],
      select: ['id', 'name', 'age'],
      defaultLimit: 10,
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        age: true,
      },
    });
  }

  // 根据ID获取用户
  async getUserById(user_id: string, withPassword = false) {
    const queryBuilder = this.userRepository.createQueryBuilder();
    return await queryBuilder
      .addSelect(withPassword ? 'user.password' : '')
      .where({ user_id })
      .getOne();
  }

  // 根据name获取用户
  async getUserByName(name: string, withPassword = false) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    return await queryBuilder
      .addSelect(withPassword ? 'user.password' : '')
      .where({ name })
      .getOne();
  }

  // 通过user_id(UUID)
  async updateUserInfoById(
    userId: string,
    updateUserDto: Partial<UpdateUserDto>,
  ) {
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('更改信息为空');
    }
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (updateUserDto.name) {
      const newUser = await this.userRepository.findOne({
        where: {
          name: updateUserDto.name,
        },
      });
      // 要更改的新用户名存在，并且不是当前用户
      if (newUser && newUser.user_id !== userId) {
        throw new BadRequestException('名称已被占用');
      }
    }
    const { password, ...rest } = updateUserDto;
    if (password) {
      const saltOrRounds = this.configService.get<number>('saltOrRounds');
      const salt = bcrypt.genSaltSync(saltOrRounds);
      const hash = bcrypt.hashSync(password, salt);
      Object.assign(rest, { password: hash });
    }
    await this.userRepository.merge(user, rest);
    await this.userRepository.save(user);
    return '更改成功';
  }

  async deleteUserById(id: string) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    const refresh_token = user.refresh_token;
    const access_token = user.access_token;
    // 将用户的access_token和refresh_token从redis中删除
    if (access_token) {
      await this.redis.del(`${id}:AccessToken:${access_token}`, access_token);
    }
    if (refresh_token) {
      await this.redis.del(
        `${id}:RefreshToken:${refresh_token}`,
        refresh_token,
      );
    }
    await this.userRepository.remove(user);
    return '删除成功';
  }
}
