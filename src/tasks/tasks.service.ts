import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from 'src/tasks/models/task-status.enum';
import { Task } from './models/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/models/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    async getAllTask(user: User): Promise<Task[]> {
        const tasks = await this.taskRepository.find({ where: { user } });
        return tasks;
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, user } });
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.IN_PROGRESS,
            user,
        });
        await this.taskRepository.save(task);
        return task;
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const found = await this.getTaskById(id, user);
        const deleteTask = await this.taskRepository.delete(found.id);
        console.log(deleteTask);
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }

    async getTaskWithFilter(taskFilterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = taskFilterDto;
        let tasks = await this.getAllTask(user);
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

    // getAllTasks() {
    //     return this.tasks;
    // }

    // GetTasksFilterDto(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter((task) => {
    //             if (task.title.includes(search) || task.description.includes(search)) {
    //                 return true;
    //             }
    //             throw new NotFoundException(`Task with ${search} not found`);
    //         })
    //     }
    //     return tasks;
    // }

    // getTaskById(id: string): Task {
    //     const findtask = this.tasks.find((task) => task.id === id);
    //     if (findtask) {
    //         return findtask;
    //     }
    //     throw new NotFoundException(`Task with ID ${id} not found`);
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;

    //     const createdTask: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.IN_PROGRESS
    //     }
    //     this.tasks.push(createdTask);
    //     return createdTask;
    // }
    // //     createTask(task: Task) {

    // //         console.log(task)
    // //         const created = this.tasks.push(task)
    // //         console.log(created)
    // //         return this.tasks[0];
    // //     }
    // // }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
