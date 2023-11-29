import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/dto/get-tasks-filter.dto';
import { Task } from 'src/models/task.model';
import { TaskStatus } from 'src/models/task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    GetTasksFilterDto(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }
        if (search) {
            tasks = tasks.filter((task) => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                throw new NotFoundException(`Task with ${search} not found`);
            })
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const findtask = this.tasks.find((task) => task.id === id);
        if (findtask) {
            return findtask;
        }
        throw new NotFoundException(`Task with ID ${id} not found`);
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
        return createdTask;
    }
    //     createTask(task: Task) {

    //         console.log(task)
    //         const created = this.tasks.push(task)
    //         console.log(created)
    //         return this.tasks[0];
    //     }
    // }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
