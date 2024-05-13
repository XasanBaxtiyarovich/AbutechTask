import { Module } from '@nestjs/common';

import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { redisClientFactory } from './redis-client.factory';

@Module({
  providers: [redisClientFactory, RedisService],
  exports: [RedisService],
  controllers: [RedisController],
})
export class RedisModule {}
