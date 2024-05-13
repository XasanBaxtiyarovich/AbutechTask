import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'bahtiyarovich', description: 'Username' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'Qwerty!2345', description: 'User password' })
    @IsNotEmpty()
    password: string;
}