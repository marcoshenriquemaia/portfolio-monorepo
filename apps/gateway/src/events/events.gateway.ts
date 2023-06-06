import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { AMQPAbstract, Directions } from '@libs/core';
import { PubSubLoop } from '../pubSubLoop/pubsub';

@WebSocketGateway()
export class EventsGateway {
  constructor(
    private rabbit: AMQPAbstract,
    private readonly pubSubLoop: PubSubLoop,
  ) {}

  handleConnection(client) {
    this.rabbit.sendEvent('rpg.world.connect', {
      id: client.id,
      name: 'teste',
      position: { x: 0, y: 0 },
      status: 'idle',
      direction: 'down',
    });

    this.pubSubLoop.subscribe(client);
  }

  handleDisconnect(client) {
    const clientId = client.id;

    this.rabbit.sendEvent('rpg.world.disconnect', { clientId });

    this.pubSubLoop.unsubscribe(client);
  }

  @SubscribeMessage('user:walk')
  handleWalk(client, direction: Directions) {
    this.rabbit.sendEvent('rpg.world.walk', {
      clientId: client.id,
      direction,
    });
  }

  @SubscribeMessage('user:stop')
  handleStop(client) {
    this.rabbit.sendEvent('rpg.world.stop', {
      clientId: client.id,
    });
  }
}
