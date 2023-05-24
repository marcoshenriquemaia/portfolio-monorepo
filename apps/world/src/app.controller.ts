import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('rpg.world.connect')
  handleConnect() {
    console.log('teste event pattern connect');
  }

  @EventPattern('rpg.world.disconnect')
  handleDisconnect() {
    console.log('teste event pattern disconnect');
  }

  @EventPattern('rpg.world.walk')
  handleWalk() {
    console.log('teste event pattern');
  }
}
