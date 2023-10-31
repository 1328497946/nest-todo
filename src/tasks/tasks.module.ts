import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { RedisModule } from 'src/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RedisModule, JwtModule, ConfigModule],
  providers: [TasksService],
})
export class TasksModule {}
