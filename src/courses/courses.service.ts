import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Course } from './entities/course.entity';
import { CreateCourseDto, UpdateCourseDto } from './dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Object> {
    await this.courseRepository.save({ ...createCourseDto });

    return HttpStatus.CREATED;
  }

  async findAll(): Promise<Object> {
    const courses = await this.courseRepository.find({ relations: { user: true }});

    if (courses.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Courses not found' };

    return { status: HttpStatus.OK, courses };
  }

  async findOne(id: number): Promise<Object> {
    const course = await this.courseRepository.findOne({ where: { id }, relations: { user: true }});

    if (!course) return { status: HttpStatus.NOT_FOUND, message: 'Course not found' };

    return { status: HttpStatus.OK, course };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Object> {
    const [ course ] = await this.courseRepository.findBy({ id });

    if (!course) return { status: HttpStatus.NOT_FOUND, message: 'Course not found' };

    await this.courseRepository.update({ id }, { ...updateCourseDto });

    const [ updatedCourse ] = await this.courseRepository.findBy({ id });

    return { status: HttpStatus.OK, updatedCourse };
  }

  async remove(id: number): Promise<Object | HttpStatus> {
    const course = await this.courseRepository.findOne({ where: { id }, relations: { user: true }});

    if (!course) return { status: HttpStatus.NOT_FOUND, message: 'Course not found' };

    await this.courseRepository.delete({ id });

    return HttpStatus.OK;
  }
}
