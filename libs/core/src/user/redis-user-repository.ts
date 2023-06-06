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
    const user = await this.redisService.hmget(
      id,
      'position',
      'name',
      'id',
      'status',
      'direction',
    );

    const formattedUser = {
      id: user[2],
      name: user[1],
      position: JSON.parse(user[0]),
      status: user[3],
      direction: user[4],
    };

    return formattedUser as User;
  }

  async create(user: User): Promise<User> {
    await this.redisService.hmset(`user_${user.id}`, {
      ...user,
      position: JSON.stringify(user.position),
    });
    return user;
  }

  async update(id: string, user: UpdateUserDto): Promise<'OK'> {
    const userExists = await this.get(`user_${id}`);

    await this.redisService.hmset(`user_${id}`, {
      ...userExists,
      ...user,
      position: user.position
        ? JSON.stringify(user.position)
        : JSON.stringify(userExists.position),
    });

    return 'OK';
  }

  async delete(id: string): Promise<void> {
    await this.redisService.del(`user_${id}`);
  }

  async findAll(): Promise<User[]> {
    const userKeys = await this.redisService.keys('user_*');

    const users: User[] = [];

    for (const key of userKeys) {
      const user = await this.get(key);

      users.push(user);
    }

    return users;
  }

  async findById(id: string): Promise<User> {
    return this.get(id);
  }
}
