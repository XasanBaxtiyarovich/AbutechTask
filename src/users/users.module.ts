import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RedisModule } from 'src/redis/redis.module';
import { Userfile } from 'src/userfiles/entities/userfile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ Users, Userfile ]
    ),
    RedisModule,
    JwtModule.register({})
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}