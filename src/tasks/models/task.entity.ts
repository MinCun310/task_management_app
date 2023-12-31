import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Repository } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "../../auth/models/user.entity";
import { Exclude } from "class-transformer";


@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne((_type) => User, (user) => user.task, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User
}