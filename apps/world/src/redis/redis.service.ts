import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super({
      host: 'localhost',
      port: 6379,
    });

    super.on('connect', () => {
      console.log('Redis connected');
    });

    super.on('error', (error) => {
      console.log('Redis error', error);
    });
  }
}
