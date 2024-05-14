import { ApiProperty } from "@nestjs/swagger";

import { Users } from "src/users/entities/user.entity";

export class UpdateCourseDto {
    @ApiProperty({ example: 1, description: 'User primary key id'}) 
    user?: Users;
  
    @ApiProperty({ example: 'title', description: 'Course title' })
    title?: string;
  
    @ApiProperty({ example: 'description', description: 'Course description' })
    description?: string; 
}