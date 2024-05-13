import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { RedisService } from './redis.service';
import { SetRedisDto } from './dto/set-redis.dto';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('ping')
  redisPing() {
    return this.redisService.ping();
  }

  @Post('set')
  set(@Body() setRedisDto: SetRedisDto) {
    return this.redisService.set(setRedisDto);
  }

  @Get('get/:key')
  get(@Param('key') key: string) {
    return this.redisService.get(key);
  }

  @Delete('del/:key') 
  del(@Param('key') key: string) {
    return this.redisService.del(key);
  }
}
