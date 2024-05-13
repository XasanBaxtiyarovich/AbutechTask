import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import { Users } from "src/users/entities/user.entity";

export class UpdateUserfileDto {
    @ApiProperty({ example: 1, description: 'User primary key id'}) 
    user: Users;
  
    @ApiProperty({ example: 'extension', description: 'User file extension' })
    extension?: string;
  
    @ApiProperty({ example: 12, description: 'User file filesize' })
    filesize?: number;
}