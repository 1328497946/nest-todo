import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { LocalStrategy } from './strategy/local.strategy';
import { AccessTokenStrategy } from './strategy/accessToken.strategy';
import { accessTokenGuard } from './guard/accessToken.guard';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { RefreshTokenStrategy } from './strategy/refreshToken.strategy';

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
    UserService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      // 全局accessTokenGuard
      provide: APP_GUARD,
      useClass: accessTokenGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
