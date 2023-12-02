import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';
import { Task } from '../models/task.entity';

@Controller('tasks')
export class TasksController {
    private tasksService: TasksService;
    constructor(tasksService: TasksService) {
        this.tasksService = tasksService;
    }

    @Get()
    async getTaskWithFilter(@Query() tasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
        if (Object.keys(tasksFilterDto).length) {
            return this.tasksService.getTaskWithFilter(tasksFilterDto);
        } else {
            return this.tasksService.getAllTask();
        }
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    async updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        const { status } = updateTaskStatusDto;
        console.log('check status:', status);
        return this.tasksService.updateTaskStatus(id, status);
    }
    // @Get()
    // getTasksFilter(@Query() filterDto: GetTasksFilterDto): Task[] {
    //     console.log('check filterDto:', filterDto);
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.GetTasksFilterDto(filterDto);
    //     }
    //     else {
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     console.log(createTaskDto);
    //     return this.tasksService.createTask(createTaskDto);
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     return this.tasksService.deleteTask(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
    //     const { status } = updateTaskStatusDto;
    //     return this.tasksService.updateTaskStatus(id, status);
    // }
}
