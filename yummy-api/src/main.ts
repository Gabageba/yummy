import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // HTTPS options (для теста с телефона задайте DISABLE_SSL=true и запускайте API по HTTP)
  const useSsl =
    process.env.DISABLE_SSL !== 'true' &&
    process.env.SSL_KEY_PATH &&
    process.env.SSL_CERT_PATH;

  const httpsOptions = useSsl
    ? {
        key: fs.readFileSync(path.resolve(process.env.SSL_KEY_PATH!)),
        cert: fs.readFileSync(path.resolve(process.env.SSL_CERT_PATH!)),
      }
    : undefined;

  const app = await NestFactory.create(
    AppModule,
    httpsOptions ? { httpsOptions } : {},
  );

  // Разрешаем запросы с фронтенда (localhost и с телефона по IP в dev)
  const isProduction = process.env.NODE_ENV === 'production';
  app.enableCors({
    origin: isProduction
      ? ['http://localhost:3000', 'https://localhost:3000']
      : true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('My NestJS API')
    .setDescription('Документация API для приложения')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
