import { Module } from '@nestjs/common';
import { UserfilesService } from './userfiles.service';
import { UserfilesController } from './userfiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userfile } from './entities/userfile.entity';
import { Users } from 'src/users/entities/user.entity';
import { FilesModule } from 'src/files/files.module';

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
