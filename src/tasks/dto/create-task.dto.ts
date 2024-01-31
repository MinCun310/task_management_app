import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../models/task-status.enum";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus)
    status?: TaskStatus;
}