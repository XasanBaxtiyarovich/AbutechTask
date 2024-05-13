import { ApiProperty } from "@nestjs/swagger";
import { Userfile } from "src/userfiles/entities/userfile.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class Users {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'bahtiyarovich', description: 'Username' })
  @Column({ type: 'text' })
  username: string;

  @ApiProperty({ example: 'dcojkwijisoidmw', description: 'User hashed passsword' })
  @Column({ type: 'text' })
  hashed_password: string;

  @ApiProperty({ example: "mkslndkjnkmlsadw", description: 'User access token' })
  @Column({ type: 'text', default: null })
  accessToken: string;

  @ApiProperty({ example: "mkslndkjnkmlsadw", description: 'User refresh token' })
  @Column({ type: 'text', default: null })
  refreshToken: string;

  @OneToMany(() => Userfile, (userFile) => userFile.user)
  userfiles: Userfile[];
}