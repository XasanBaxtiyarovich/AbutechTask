import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';

import { CreateCoursefileDto } from './dto';
import { Coursefile } from './entities/coursefile.entity';
import { CoursefilesService } from './coursefiles.service';

@Controller('coursefiles')
export class CoursefilesController {
  constructor(private readonly coursefilesService: CoursefilesService) {}

  @ApiOperation({ summary: "Course file add" })
  @ApiResponse({ status: 200, type: Coursefile })
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: any,
    @Body() createCoursefileDto: CreateCoursefileDto
  ): Promise<Object> {
    return this.coursefilesService.create(createCoursefileDto, file);
  }

  @ApiOperation({ summary: "Course files find all" })
  @ApiResponse({ status: 200, type: Coursefile })
  @Get('findAll')
  findAll(): Promise<Object> {
    return this.coursefilesService.findAll();
  }

  @ApiOperation({ summary: "Course file find one" })
  @ApiResponse({ status: 200, type: Coursefile })
  @Get('find/:id')
  findOne(
    @Param('id') id: string
  ): Promise<Object> {
    return this.coursefilesService.findOne(+id);
  }

  @ApiOperation({ summary: "Course file delete one" })
  @ApiResponse({ status: 200, type: Coursefile })
  @Delete('remove/:id')
  remove(
    @Param('id') id: string
  ): Promise<Object | HttpStatus> {
    return this.coursefilesService.remove(+id);
  }
}
