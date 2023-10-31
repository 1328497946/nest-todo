import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Timeout } from '@nestjs/schedule';
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

  // 每天0秒执行一次
  // @Cron('10 * * * * *')
  @Timeout(5000)
  async handleCron() {
    const accessTokenBlacklist = await this.redis.lrange(
      'AccessTokenBlacklist',
      0,
      -1,
    );
    this.logger.log(accessTokenBlacklist, 'yy');
    accessTokenBlacklist.map((o) => {
      // const time = new Date().getTime();
      this.jwtService
        .verify(o, {
          secret: this.configService.get<string>('accessTokenSecret'),
        })
        .catch(() => {
          this.logger.error(o);
          this.redis.lrem('AccessTokenBlacklist', 0, o);
        });
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
