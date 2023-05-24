import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from '../../../libs/core/src/rabbitmq/rabbitmq.service';
import { EventsGateway } from './events/events.gateway';
import { AMQPAbstract } from '@libs/core';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}`,
          ],
          queue: 'world',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: AMQPAbstract,
      useClass: RabbitMQService,
    },
    EventsGateway,
  ],
})
export class AppModule {}
