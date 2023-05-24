import {
  RedisService,
  UpdateUserDto,
  User,
  UserRepositoryAbstract,
} from '@libs/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisUserRepository implements UserRepositoryAbstract {
  constructor(private readonly redisService: RedisService) {}

  async get(id: string): Promise<User> {
    const user = await this.redisService.hgetall(`user_${id}`);

    return user as unknown as User;
  }

  async create(user: User): Promise<User> {
    await this.redisService.hmset(`user_${user.id}`, user);
    return user;
  }

  async update(id: string, user: UpdateUserDto): Promise<'OK'> {
    await this.redisService.hmset(`user_${id}`, user);
    return 'OK';
  }

  async delete(id: string): Promise<void> {
    await this.redisService.del(`user_${id}`);
  }

  async findAll(): Promise<User[]> {
    const userKeys = await this.redisService.keys('user_*');
    const pipeline = this.redisService.pipeline();

    for (const key of userKeys) {
      pipeline.hgetall(key);
    }

    const results = await pipeline.exec();
    const users: User[] = [];

    for (const [, user] of results) {
      if (user) {
        users.push(user as User);
      }
    }

    return users;
  }

  async findById(id: string): Promise<User> {
    return this.get(id);
  }
}
