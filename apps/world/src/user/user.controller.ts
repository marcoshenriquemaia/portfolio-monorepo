import { UserDto, UserRepositoryAbstract } from '@libs/core';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userRepository: UserRepositoryAbstract) {}

  @EventPattern('rpg.world.connect')
  async handleConnection(user: UserDto) {
    console.log('CUSTOM_LOG:', 'user', user);

    await this.userRepository.create(user);

    console.log((await this.userRepository.findAll()).length);
  }

  @EventPattern('rpg.world.disconnect')
  async handleDisconnect({ clientId }: { clientId: string }) {
    console.log('CUSTOM_LOG: disconnect', 'user', clientId);

    await this.userRepository.delete(clientId);

    console.log((await this.userRepository.findAll()).length);
  }
}
