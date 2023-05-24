import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();

  // const port = configService.get('GATEWAY_PORT');
  const port = 3000;

  console.log('CUSTOM_LOG:eee', 'porteeee', port);

  const app = await NestFactory.create(GatewayModule);
  await app.listen(port);
}
bootstrap();
