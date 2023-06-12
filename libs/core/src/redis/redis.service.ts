import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS,
      // host: 'redis-18109.c10.us-east-1-2.ec2.cloud.redislabs.com',
      // port: 18109,
      // password: 'asozbrtc0tPZ5sf3OsBc2LbZ5IiCzq4Z',
    });

    super.on('connect', () => {
      console.log('Redis connected');
    });

    super.on('error', (error) => {
      console.log('Redis error', error);
    });
  }
}
