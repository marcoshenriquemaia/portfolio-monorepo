import { Controller, Get } from '@nestjs/common';
import { WorldService } from './world.service';

@Controller()
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Get()
  getHello(): string {
    return this.worldService.getHello();
  }
}
