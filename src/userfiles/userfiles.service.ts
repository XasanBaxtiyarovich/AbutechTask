import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Userfile } from './entities/userfile.entity';
import { Users } from 'src/users/entities/user.entity';
import { FilesService } from 'src/files/files.service';
import { CreateUserfileDto, UpdateUserfileDto } from './dto';

@Injectable()
export class UserfilesService {
  constructor(
    private fileService: FilesService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Userfile) private userfileRepository: Repository<Userfile>
  ) {}

  async create(createUserfileDto: CreateUserfileDto, file: any): Promise<Object> {
    const filename = await this.fileService.createFile(file);

    await this.userfileRepository.save({ ...createUserfileDto, filename });
    
    const newUserFile = await this.userfileRepository.findOne({ where: { filename }, relations: { user: true }});

    return { status: HttpStatus.CREATED, newUserFile };
  }

  async findAll(): Promise<Object> {
    const userfiles = await this.userfileRepository.find({ relations: { user: true } });

    if (userfiles.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'User files not found' };

    return { status: HttpStatus.OK, userfiles };
  }

  async findOne(id: number): Promise<Object> {
    const userfile = await this.userfileRepository.findOne({ where: { id }, relations: { user: true }});

    if (!userfile) return { status: HttpStatus.NOT_FOUND, message: 'User file not found' };

    return { status: HttpStatus.OK, userfile };
  }

  async update(id: number, updateUserfileDto: UpdateUserfileDto, file: any): Promise<Object> {
    const userfile = await this.userfileRepository.findOne({ where: { id }, relations: { user: true }});

    if (!userfile) return { status: HttpStatus.NOT_FOUND, message: 'User file not found' };

    if (file) {
      const filename = await this.fileService.createFile(file);
      
      await this.userfileRepository.update({ id }, { ...updateUserfileDto, filename });
    } else {
      await this.userfileRepository.update({ id }, { ...updateUserfileDto });
    }

    const [ updatedUserFiles ] = await this.userfileRepository.findBy({ id });

    return { status: HttpStatus.OK, updatedUserFiles };
  }

  async remove(id: number): Promise<Object | HttpStatus> {
    const [ userfile ] = await this.userfileRepository.findBy({ id });

    if (!userfile) return { status: HttpStatus.NOT_FOUND, message: 'User file not found' };

    const status = await this.fileService.removeFile(userfile.filename);
    
    if (status == 500) return HttpStatus.INTERNAL_SERVER_ERROR;

    await this.userfileRepository.delete(id);

    return HttpStatus.OK;
  }
}
