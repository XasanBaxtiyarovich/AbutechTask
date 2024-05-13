import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, HttpStatus, Put } from '@nestjs/common';

import { Users } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthenticatedRequest, UserGuard } from 'src/guards/user-guard';
import { CreateUserDto, UpdateUserDto, SignInDto, SignUpDto, UpdatePasswordDto, UpdateAccessTokenDto } from './dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
    // Foydalanuvchi yaratish (login, parol)
    @ApiOperation({ summary: "User sign up" })
    @ApiResponse({ status: 200, type: Users })
    @Post('signup')
    user_signup(
      @Body() SignUpDto: SignUpDto
    ): Promise<Object> {
      return this.usersService.user_signup(SignUpDto)
    }
  
    // Foydalanuvchi kirishi (accessToken, refreshToken qaytarish)
    @ApiOperation({ summary: "User sign in" })
    @ApiResponse({ status: 200, type: Users  })
    @Post('signin')
    user_signin(
      @Body() signInDto: SignInDto
    ): Promise<Object> {
      return this.usersService.user_signin(signInDto)
    }

    // Foydalanuvchi (token orqali)
    @ApiOperation({ summary: "User sign out" })
    @ApiResponse({ status: 200, type: Users })
    @UseGuards(UserGuard)
    @Post('signout')
    @UseGuards(UserGuard)
    user_signout(
      @Req() req: AuthenticatedRequest
    ): Promise<Object | HttpStatus> {
      const { id } = req.user; 
      return this.usersService.user_signout(id)
    }
  
    // Foydalanuvchi yaratish (login, parol)
    @ApiOperation({summary: "User create"})
    @ApiResponse({ status: 200, type: Users })
    @UseGuards(UserGuard)
    @Post('user-create')
    user_create(
      @Body() createUserDto: CreateUserDto
    ): Promise<Object> {
      return this.usersService.user_create(createUserDto)
    }

    @ApiOperation({ summary: "Find all users" })
    @ApiResponse({ status: 200, type: [ Users ] })
    @UseGuards(UserGuard)
    @Get('findAll')
    find_users(): Promise<Object> {
      return this.usersService.find_users()
    }
  
    @ApiOperation({ summary: "Find one user" })
    @ApiResponse({ status: 200, type: Users })
    @UseGuards(UserGuard)
    @Get('find/:id')
    find_user(
      @Param('id') id: number
    ): Promise<Object> {
      return this.usersService.find_user(id)
    }
  
    // Token bo'yicha foydalanuvchi ma'lumotlarini olish
    @Get('find-user-byToken')
    @UseGuards(UserGuard)
    async findUserByToken (
      @Req() req: AuthenticatedRequest
    ): Promise<Object> {
      const { id } = req.user; 
      return this.usersService.find_user(id)
    }
  
    @ApiOperation({ summary: "Update user data" })
    @ApiResponse({ status: 200, type: Users })
    @UseGuards(UserGuard)
    @Put('update/:id')
    update_user_data(
      @Param('id') id: number,
      @Body() updateUserDto: UpdateUserDto
    ): Promise<Object> {
      return this.usersService.update_user_data(id, updateUserDto)
    }
  
    @ApiOperation({ summary: "Update user password" })
    @ApiResponse({ status: 200, type: Users })
    @UseGuards(UserGuard)
    @Put('update-password/:id')
    update_user_pass(
      @Param('id') id: number,
      @Body() updatePasswordDto: UpdatePasswordDto
    ): Promise<Object> {
      return this.usersService.update_user_pass(id, updatePasswordDto);
    }
  
    @ApiOperation({ summary: "Remove user" })
    @ApiResponse({ status:200 })
    @UseGuards(UserGuard)
    @Delete('remove/:id')
    remove_user(
      @Param('id') id: number,
    ): Promise<Object | Number>{
      return this.usersService.remove_user(id)
    }

    // Yangi accessToken ni refreshToken orqali yangilash
    @ApiOperation({ summary: "Update access token" })
    @ApiResponse({ status: 200, type: Users })
    @Post('update-accessToken/:id')
    update_user_access_token(
      @Param('id') id: number,
      @Body() updateAccessTokenDto: UpdateAccessTokenDto
    ): Promise<Object> {
      return this.usersService.update_user_access_token(id, updateAccessTokenDto)
    }
}