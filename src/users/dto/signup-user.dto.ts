import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({ example: 'bahtiyarovich', description: 'Username' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty({ example: 'Qwerty!2345', description: 'User password' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}