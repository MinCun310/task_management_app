import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from 'src/models/task.model';
import { CreateTaskDto } from 'src/dto/createTaskDto';

@Controller('tasks')
export class TasksController {
    private tasksService: TasksService;
    constructor(tasksService: TasksService) {
        this.tasksService = tasksService;
    }

    @Get()
    getAllTasks() {
        this.tasksService.getAllTasks();
    }

    @Get('/id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        console.log(createTaskDto);
        return this.tasksService.createTask(createTaskDto);
    }
}
