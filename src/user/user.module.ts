import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserEntity]), RedisModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
