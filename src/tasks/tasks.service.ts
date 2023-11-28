import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/createTaskDto';
import { Task } from 'src/models/task.model';
import { TaskStatus } from 'src/models/task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const findtask = this.tasks.find(task => task.id === id);
        if (findtask) {
            return findtask;
        }
        throw new Error(`Task with ID ${id} not found`);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const createdTask: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.IN_PROGRESS
        }
        this.tasks.push(createdTask);
        console.log(createdTask);
        return createdTask;
    }
    //     createTask(task: Task) {

    //         console.log(task)
    //         const created = this.tasks.push(task)
    //         console.log(created)
    //         return this.tasks[0];
    //     }
    // }
}
