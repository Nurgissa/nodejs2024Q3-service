import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';
import { LoggerService } from './logger/logger.service';
import { CustomExceptionFilter } from './custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get(LoggerService);
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new CustomExceptionFilter(httpAdapterHost, loggerService),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(loggerService);

  const config = new DocumentBuilder()
    .setTitle('Home library service')
    .setDescription('The home library service API description')
    .setVersion('1.0')
    .addTag('hls')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const PORT = 4000;
  await app.listen(PORT);
}
bootstrap();
