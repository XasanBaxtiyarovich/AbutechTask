import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus } from '@nestjs/common';

import { Course } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';

@ApiTags('Courses')
@Controller('course')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Foydalanuvchi uchun kurs qo'shish (sarlavha, tavsif)
  @ApiOperation({ summary: "Course add" })
  @ApiResponse({ status: 200, type: Course })
  @Post('create')
  create(
    @Body() createCourseDto: CreateCourseDto
  ): Promise<Object> {
    return this.coursesService.create(createCourseDto);
  }

  // Barcha kurslarni olish
  @ApiOperation({ summary: "Courses find all" })
  @ApiResponse({ status: 200, type: Course })
  @Get('findAll')
  findAll(): Promise<Object> {
    return this.coursesService.findAll();
  }

  // Kurs haqida ma'lumot
  @ApiOperation({ summary: "Course find one" })
  @ApiResponse({ status: 200, type: Course })
  @Get('find/:id')
  findOne(
    @Param('id') id: string
  ): Promise<Object> {
    return this.coursesService.findOne(+id);
  }

  // Kursni yangilash
  @ApiOperation({ summary: "Course update" })
  @ApiResponse({ status: 200, type: Course })
  @Put('update/:id')
  update(
    @Param('id') id: string, 
    @Body() updateCourseDto: UpdateCourseDto
  ): Promise<Object> {
    return this.coursesService.update(+id, updateCourseDto);
  }

  // Kursni o'chirish
  @ApiOperation({ summary: "Course remove" })
  @ApiResponse({ status: 200, type: Course })
  @Delete('remove/:id')
  remove(
    @Param('id') id: string
  ): Promise<Object | HttpStatus> {
    return this.coursesService.remove(+id);
  }
}
