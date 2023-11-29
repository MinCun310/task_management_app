import { IsEnum } from "class-validator";
import { TaskStatus } from "src/models/task.model";

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus
}