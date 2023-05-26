import {
  Directions,
  GameConfig,
  PositionInterface,
  UserDto,
  UserRepositoryAbstract,
} from '@libs/core';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userRepository: UserRepositoryAbstract) {}

  @EventPattern('rpg.world.connect')
  async handleConnection(user: UserDto) {
    await this.userRepository.create(user);
  }

  @EventPattern('rpg.world.disconnect')
  async handleDisconnect({ clientId }: { clientId: string }) {
    await this.userRepository.delete(clientId);
  }

  @EventPattern('rpg.world.walk')
  async handleWalk({
    clientId,
    direction,
  }: {
    clientId: string;
    direction: Directions;
  }) {
    const directionDict: Record<Directions, PositionInterface> = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
      'up-left': { x: -1, y: -1 },
      'up-right': { x: 1, y: -1 },
      'down-left': { x: -1, y: 1 },
      'down-right': { x: 1, y: 1 },
    };

    const user = await this.userRepository.get(`user_${clientId}`);

    if (user) {
      const currentPosition = user.position;
      const acceleration = directionDict[direction];

      const speed = GameConfig.userSpeed;

      const normalizedAcceleration: PositionInterface = {
        x: acceleration.x !== 0 ? acceleration.x / Math.sqrt(2) : 0,
        y: acceleration.y !== 0 ? acceleration.y / Math.sqrt(2) : 0,
      };

      const newPosition: PositionInterface = {
        x: currentPosition.x + normalizedAcceleration.x * speed,
        y: currentPosition.y + normalizedAcceleration.y * speed,
      };

      await this.userRepository.update(clientId, {
        position: newPosition,
      });
    }
  }

  @EventPattern('rpg.world.stop')
  async handleStop({ clientId }: { clientId: string }) {
    const user = await this.userRepository.get(`user_${clientId}`);

    if (user) {
      await this.userRepository.update(clientId, {
        status: 'idle',
      });
    }
  }
}
