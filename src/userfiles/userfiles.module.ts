import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesModule } from 'src/files/files.module';
import { Userfile } from './entities/userfile.entity';
import { Users } from 'src/users/entities/user.entity';
import { UserfilesService } from './userfiles.service';
import { UserfilesController } from './userfiles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Userfile, Users
    ]),
    FilesModule
  ],
  controllers: [UserfilesController],
  providers: [UserfilesService],
})
export class UserfilesModule {}
