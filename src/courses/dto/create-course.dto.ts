import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import { Users } from "src/users/entities/user.entity";

export class CreateCourseDto {
    @ApiProperty({ example: 1, description: 'User primary key id'}) 
    user: Users;
  
    @ApiProperty({ example: 'title', description: 'Course title' })
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @ApiProperty({ example: 'description', description: 'Course description' })
    @IsString()
    @IsNotEmpty()
    description: string; 
}