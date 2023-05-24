import { Test, TestingModule } from '@nestjs/testing';
import { RedisController } from './redis.controller';
import { RedisService } from './redis.service';

describe('RedisController', () => {
  let redisController: RedisController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RedisController],
      providers: [RedisService],
    }).compile();

    redisController = app.get<RedisController>(RedisController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(redisController.getHello()).toBe('Hello World!');
    });
  });
});
