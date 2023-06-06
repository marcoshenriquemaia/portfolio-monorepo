import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();

  const PORT = configService.get('GATEWAY_PORT');

  console.log('CUSTOM_LOG:', 'PORT', PORT);

  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);
}

bootstrap();
