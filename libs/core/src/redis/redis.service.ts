import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });

    super.on('connect', () => {
      console.log('Redis connected');
    });

    super.on('error', (error) => {
      console.log('Redis error', error);
    });
  }
}
