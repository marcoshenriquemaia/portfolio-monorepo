import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {
    this.client.connect();
  }

  async sendEvent<E = any>(event: string, data: E) {
    await this.client.emit(event, data);
  }
}
