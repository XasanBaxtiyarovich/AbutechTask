import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';

import { SetRedisDto } from './dto/set-redis.dto';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly redisClient: RedisClient;

  public constructor (@Inject(REDIS_CLIENT) redisClient: RedisClient) {
    this.redisClient = redisClient;
  }

  ping () {
    return this.redisClient.ping();
  }
  
  async set(setRedisDto: SetRedisDto): Promise<string> {
    const { key, value } = setRedisDto;

    await this.redisClient.set(key, value, { EX: 600 });

    return `Set value to Redis ${ value }`;
  }
  
  async get(key: string): Promise<string> {
    const retrievedValue = await this.redisClient.get(key);
    
    return `Retrieved value from Redis: ${ retrievedValue }`;
  }

  async del(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  async onModuleDestroy() {
    await this.redisClient.quit(); 
  }
}
