import { NestFactory } from '@nestjs/core';
import { WorldModule } from './world.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();

  // const port = configService.get('WORLD_PORT');
  const port = 3003;

  console.log('bleeeee');

  const app = await NestFactory.create(WorldModule);
  await app.listen(port);
}
bootstrap();
