import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EmitterGateway {
  @WebSocketServer() server: Server;

  toEveryone(event: string, data: any) {
    this.server.emit(event, data);
  }
}
