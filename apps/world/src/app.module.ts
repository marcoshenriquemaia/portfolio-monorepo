import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RedisService, UserRepositoryAbstract } from '@libs/core';
import { RedisUserRepository } from './user/redis-user-repository';
import { UserController } from './user/user.controller';

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
