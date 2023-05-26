import { Module } from '@nestjs/common';
import { RabbitMQService } from '../../../libs/core/src/rabbitmq/rabbitmq.service';
import { EventsGateway } from './events/events.gateway';
import {
  AMQPAbstract,
  RedisService,
  RedisUserRepository,
  UserRepositoryAbstract,
} from '@libs/core';
import { PubSubLoop } from './pubSubLoop/pubsub';
import { worldRabbitmqClient } from '@libs/core/registers';

@Module({
  imports: [worldRabbitmqClient],
  controllers: [],
  providers: [
    RedisService,
    {
      provide: AMQPAbstract,
      useClass: RabbitMQService,
    },
    {
      provide: UserRepositoryAbstract,
      useClass: RedisUserRepository,
    },
    EventsGateway,
    PubSubLoop,
  ],
})
export class AppModule {}
