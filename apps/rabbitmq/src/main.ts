import { NestFactory } from '@nestjs/core';
import { RabbitmqModule } from './rabbitmq.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();

  // const port = configService.get('RABBITMQ_MICROSERVICE_PORT');
  const port = 3001;

  console.log('blaaaaaaee');

  const app = await NestFactory.create(RabbitmqModule);
  await app.listen(port);
}
bootstrap();
