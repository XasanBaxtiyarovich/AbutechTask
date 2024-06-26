import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/user.entity';
import { RedisModule } from './redis/redis.module';
import { UserfilesModule } from './userfiles/userfiles.module';
import { Userfile } from './userfiles/entities/userfile.entity';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/entities/course.entity';
import { CoursefilesModule } from './coursefiles/coursefiles.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ Users, Userfile, Course ],
      synchronize: true,
    }),

    UsersModule,

    RedisModule,

    UserfilesModule,

    CoursesModule,

    CoursefilesModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}