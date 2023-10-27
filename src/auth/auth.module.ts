import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { LocalStrategy } from './local.strategy';
import { AccessTokenStrategy } from './accessToken.strategy';
import { accessTokenGuard } from './accessToken.guard';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    {
      // 全局accessTokenGuard
      provide: APP_GUARD,
      useClass: accessTokenGuard,
    },
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
