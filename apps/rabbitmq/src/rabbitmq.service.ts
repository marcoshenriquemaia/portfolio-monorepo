import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  getHello(): string {
    return 'Hello World!';
  }
}
