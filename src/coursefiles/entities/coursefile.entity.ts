import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('course_files')
export class Coursefile {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Users, (user) => user.coursefiles)
    user: Users;

    @ApiProperty({ example: 'file name', description: 'Course file name' })
    @Column({ type: 'text' })
    filename: string;
}
