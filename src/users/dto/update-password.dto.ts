import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class UpdatePasswordDto{
    @ApiProperty({ example: 'dcsdcmkre', description: 'User hashed password' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'dcsdcmkre', description: 'User hashed password' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    new_password: string;

    @ApiProperty({ example: 'dcsdcmkre', description: 'User hashed password' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    confirm_password: string;
}