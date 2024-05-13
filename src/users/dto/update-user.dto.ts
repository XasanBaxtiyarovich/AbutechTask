import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: 'bahtiyarovich', description: 'Username' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;
}