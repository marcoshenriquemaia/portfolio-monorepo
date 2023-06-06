import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const configService = new ConfigService();

  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const PORT = configService.get('RABBITMQ_PORT');
  const QUEUE = 'world';

  console.log('CUSTOM_LOG:', 'USER', USER);
  console.log('CUSTOM_LOG:', 'PASSWORD', PASSWORD);
  console.log('CUSTOM_LOG:', 'HOST', HOST);
  console.log('CUSTOM_LOG:', 'PORT', PORT);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}:${PORT}`],
        queue: QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
