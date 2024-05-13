import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"

export class UpdateAccessTokenDto{
    @ApiProperty({ example: 'dcsdcmkre', description: 'User refresh token' })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}