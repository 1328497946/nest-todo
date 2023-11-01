import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置全局uniform response format
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 全局路由前缀
  app.setGlobalPrefix('api/v1');
  // 允许跨域
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
