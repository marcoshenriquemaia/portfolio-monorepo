import { GameConfig, UserRepositoryAbstract } from '@libs/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PubSubLoop {
  private readonly subscribers = [];
  constructor(private readonly userRepository: UserRepositoryAbstract) {
    setInterval(this.loop, GameConfig.tickRate);
  }

  async subscribe(client: any) {
    this.subscribers.push(client);
  }

  async unsubscribe(client: any) {
    const index = this.subscribers.indexOf(client);

    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  loop = async () => {
    if (!this.subscribers.length) return;

    const userList = await this.userRepository.findAll();

    console.log('CUSTOM_LOG:', 'userList', userList);

    for (const client of this.subscribers) {
      client.emit('world:update', {
        userList,
      });
    }
  };
}
