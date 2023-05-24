import { Module } from '@nestjs/common';
import { WorldController } from './world.controller';
import { WorldService } from './world.service';

@Module({
  imports: [],
  controllers: [WorldController],
  providers: [WorldService],
})
export class WorldModule {}
