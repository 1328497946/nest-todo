import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ResponseInterceptor } from './response/response.interceptor';
import { HttpExceptionFilter } from './execption/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Compression can greatly decrease the size of the response body
   * thereby increasing the speed of a web app.
   */
  app.use(compression());
  // 全局路由前缀
  app.setGlobalPrefix('api/v1');
  // 允许跨域
  app.enableCors();
  // 配置全局uniform response format
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 配置全局Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * If set to true
       * validator will strip validated (returned) object
       * of any properties that do not use any validation decorators.
       */
      whitelist: true,
      /**
       * When set to true
       * validation of the given property will stop after encountering the first error
       * Defaults to false
       */
      stopAtFirstError: true,
    }),
  );
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
