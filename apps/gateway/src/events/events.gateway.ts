import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { WalkPayload } from './interfaces/payload';

@WebSocketGateway()
export class EventsGateway {
  constructor(private rabbit: RabbitMQService) {}

  handleConnection(client: any) {
    const clientId = client.id;

    this.rabbit.sendEvent('rpg.world.connect', { clientId });
  }

  handleDisconnect(client: any) {
    const clientId = client.id;

    this.rabbit.sendEvent('rpg.world.disconnect', { clientId });
  }

  @SubscribeMessage('walk')
  handleWalk(client: any, payload: WalkPayload) {
    const clientId = client.id;

    console.log('LOG:', 'clientId', clientId);

    this.rabbit.sendEvent('rpg.world.walk', payload);
  }
}
