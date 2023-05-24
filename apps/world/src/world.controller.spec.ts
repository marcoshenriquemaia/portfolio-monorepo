import { Test, TestingModule } from '@nestjs/testing';
import { WorldController } from './world.controller';
import { WorldService } from './world.service';

describe('WorldController', () => {
  let worldController: WorldController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WorldController],
      providers: [WorldService],
    }).compile();

    worldController = app.get<WorldController>(WorldController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(worldController.getHello()).toBe('Hello World!');
    });
  });
});
