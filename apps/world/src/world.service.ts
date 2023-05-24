import { Injectable } from '@nestjs/common';

@Injectable()
export class WorldService {
  getHello(): string {
    return 'Hello World!';
  }
}
