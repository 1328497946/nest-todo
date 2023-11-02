import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response/response.interceptor';
import { HttpExceptionFilter } from './execption/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局路由前缀
  app.setGlobalPrefix('api/v1');
  // 允许跨域
  app.enableCors();
  // 配置全局uniform response format
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 配置全局Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
