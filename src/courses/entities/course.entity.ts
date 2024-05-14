import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Users } from "src/users/entities/user.entity";

@Entity('courses')
export class Course {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Users, (user) => user.userfiles)
    user: Users;

    @ApiProperty({ example: 'title', description: 'Course title' })
    @Column({ type: 'text' })
    title: string;
  
    @ApiProperty({ example: 'description', description: 'Course description' })
    @Column({ type: 'text' })
    description: string;
}