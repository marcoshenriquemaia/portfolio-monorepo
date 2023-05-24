import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { AMQPAbstract, WalkDto } from '@libs/core';

@WebSocketGateway()
export class EventsGateway {
  constructor(private rabbit: AMQPAbstract) {}

  handleConnection(client: any) {
    this.rabbit.sendEvent('rpg.world.connect', {
      id: client.id,
      name: 'teste',
      position: { x: 0, y: 0 },
      status: 'idle',
    });
  }

  handleDisconnect(client: any) {
    const clientId = client.id;

    this.rabbit.sendEvent('rpg.world.disconnect', { clientId });
  }

  @SubscribeMessage('walk')
  handleWalk(client: any, payload: WalkDto) {
    const clientId = client.id;

    console.log('LOG:', 'clientId', clientId);

    this.rabbit.sendEvent('rpg.world.walk', payload);
  }
}
