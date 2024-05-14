import { ApiProperty } from "@nestjs/swagger";

import { Users } from "src/users/entities/user.entity";

export class CreateCoursefileDto {
    @ApiProperty({ example: 1, description: 'User primary key id'}) 
    user: Users;
}