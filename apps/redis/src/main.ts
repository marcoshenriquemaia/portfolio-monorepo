import { NestFactory } from '@nestjs/core';
import { RedisModule } from './redis.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();

  // const port = configService.get('REDIS_MICROSERVICE_PORT');
  const port = 3002;

  console.log('redis');

  const app = await NestFactory.create(RedisModule);
  await app.listen(port);
}
bootstrap();
