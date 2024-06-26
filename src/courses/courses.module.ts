import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { Users } from 'src/users/entities/user.entity';
import { CoursesController } from './courses.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ Course, Users ]
    )
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
