import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cron } from '@nestjs/schedule';
import { Redis } from 'ioredis';

@Injectable()
export class TasksService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(TasksService.name);
  /**
   * * * * * * * 分别对应的意思：
   * 第1个星：秒
   * 第2个星：分钟
   * 第3个星：小时
   * 第4个星：一个月中的第几天
   * 第5个星：月
   * 第6个星：一个星期中的第几天
   * 如：
   * 45 * * * * *：每隔45秒执行一次
   */

  /**
   * token过期时间是15分钟
   * 每到15分钟执行一次清空在黑名单中的Token
   */
  @Cron('* */15 * * * *')
  async handleCron() {
    this.removeToken('AccessTokenBlacklist');
    this.removeToken('RefreshTokenBlacklist');
  }

  async removeToken(name: string) {
    this.logger.log(`开始清理${name}黑名单`);
    const tokens = await this.redis.lrange(name, 0, -1);
    tokens.map(async (o) => {
      try {
        await this.jwtService.verify(o, {
          secret: this.configService.get<string>(name),
        });
      } catch (e) {
        // 移除过期Token
        await this.redis.lrem(name, 0, o);
      }
    });
  }

  // 每隔45秒执行一次
  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.log('Called when the second is 45');
  // }

  // 每隔10秒执行一次
  // @Interval(10000)
  // handleInterval() {
  //   this.logger.log('Called every 10 seconds');
  // }

  // 5秒只执行一次
  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.log('Called once after 5 seconds');
  // }
}
