import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response/response.interceptor';
import { HttpExceptionFilter } from './execption/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局路由前缀
  app.setGlobalPrefix('api/v1');
  // 允许跨域
  app.enableCors();
  // 配置全局uniform response format
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 配置全局Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));
  const config = new DocumentBuilder()
    .setTitle('nest-todo')
    .setDescription('nest-todo api document')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
