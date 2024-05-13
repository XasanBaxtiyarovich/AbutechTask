import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UploadedFile, UseInterceptors, Put } from '@nestjs/common';

import { Userfile } from './entities/userfile.entity';
import { UserfilesService } from './userfiles.service';
import { CreateUserfileDto, UpdateUserfileDto } from './dto';

@ApiTags("User files")
@Controller('userfiles')
export class UserfilesController {
  constructor(private readonly userfilesService: UserfilesService) {}

  // Foydalanuvchiga faylni qo'shish
  @ApiOperation({ summary: "User file add" })
  @ApiResponse({ status: 200, type: Userfile })
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: any,
    @Body() createUserfileDto: CreateUserfileDto
  ): Promise<Object> {
    return this.userfilesService.create(createUserfileDto, file);
  }

  // Barcha fayllar ro'yxatini olish
  @ApiOperation({ summary: "User files find all" })
  @ApiResponse({ status: 200, type: [Userfile] })
  @Get('findAll')
  findAll(): Promise<Object> {
    return this.userfilesService.findAll();
  }

  // Fayl haqida ma'lumotni olish
  @ApiOperation({ summary: "User file find one" })
  @ApiResponse({ status: 200, type: Userfile })
  @Get('find/:id')
  findOne(
    @Param('id') id: string
  ): Promise<Object> {
    return this.userfilesService.findOne(+id);
  }

  // Fayl haqida ma'lumotni yangilash
  @ApiOperation({ summary: "User file add" })
  @ApiResponse({ status: 200, type: Userfile })
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: any,
    @Body() updateUserfileDto: UpdateUserfileDto
  ): Promise<Object> {
    return this.userfilesService.update(+id, updateUserfileDto, file);
  }

  // Faylni o'chirish
  @ApiOperation({ summary: "User file remove" })
  @ApiResponse({ status: 200 })
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.userfilesService.remove(+id);
  }
}
