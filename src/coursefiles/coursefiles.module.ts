import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesModule } from 'src/files/files.module';
import { Users } from 'src/users/entities/user.entity';
import { Coursefile } from './entities/coursefile.entity';
import { CoursefilesService } from './coursefiles.service';
import { CoursefilesController } from './coursefiles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ Coursefile, Users ]
    ),
    FilesModule
  ],
  controllers: [CoursefilesController],
  providers: [CoursefilesService],
})
export class CoursefilesModule {}
