import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  RedisService,
  RedisUserRepository,
  UserController,
  UserRepositoryAbstract,
} from '@libs/core';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    RedisService,
    {
      provide: UserRepositoryAbstract,
      useClass: RedisUserRepository,
    },
  ],
})
export class AppModule {}
