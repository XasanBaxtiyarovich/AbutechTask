import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Users } from "src/users/entities/user.entity";

@Entity('user_files')
export class Userfile {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Users, (user) => user.userfiles)
    user: Users;

    @ApiProperty({ example: 'kmcxlksm.txt', description: 'User file name' })
    @Column({ type: 'text' })
    filename: string;
  
    @ApiProperty({ example: 'extension', description: 'User file extension' })
    @Column({ type: 'text' })
    extension: string;
  
    @ApiProperty({ example: 12, description: 'User file filesize' })
    @Column({ type: 'int'})
    filesize: number;
}
