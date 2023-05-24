import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AMQPAbstract } from '../abstracts/amqp';

@Injectable()
export class RabbitMQService implements AMQPAbstract {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {
    this.client.connect();
  }

  sendEvent<E = any>(event: string, data: E) {
    this.client.emit(event, data);
  }
}
