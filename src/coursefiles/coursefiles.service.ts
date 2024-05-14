import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateCoursefileDto } from './dto';
import { FilesService } from 'src/files/files.service';
import { Coursefile } from './entities/coursefile.entity';

@Injectable()
export class CoursefilesService {
  constructor(
    private fileService: FilesService,
    @InjectRepository(Coursefile) private coursefileRepository: Repository<Coursefile>
  ) {}

  async create(createCoursefileDto: CreateCoursefileDto, file: any): Promise<Object> {
    const filename = await this.fileService.createFile(file);

    await this.coursefileRepository.save({ ...createCoursefileDto, filename });
    
    const newUserCourseFile = await this.coursefileRepository.findOne({ where: { filename }, relations: { user: true }});

    return { status: HttpStatus.CREATED, newUserCourseFile };
  }

  async findAll(): Promise<Object> {
    const coursefiles = await this.coursefileRepository.find({ relations: { user: true } });

    if (coursefiles.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Course files not found' };

    return { status: HttpStatus.OK, coursefiles };
  }

  async findOne(id: number): Promise<Object> {
    const coursefile = await this.coursefileRepository.findOne({ where: { id }, relations: { user: true }});

    if (!coursefile) return { status: HttpStatus.NOT_FOUND, message: 'Course file not found' };

    return { status: HttpStatus.OK, coursefile };
  }

  async remove(id: number): Promise<Object | HttpStatus> {
    const [ coursefile ] = await this.coursefileRepository.findBy({ id });

    if (!coursefile) return { status: HttpStatus.NOT_FOUND, message: 'User file not found' };

    await this.coursefileRepository.delete(id);

    return HttpStatus.OK;
  }
}
