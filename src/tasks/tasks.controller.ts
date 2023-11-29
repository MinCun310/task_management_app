import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from 'src/models/task.model';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from 'src/dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    private tasksService: TasksService;
    constructor(tasksService: TasksService) {
        this.tasksService = tasksService;
    }

    @Get()
    getTasksFilter(@Query() filterDto: GetTasksFilterDto): Task[] {
        console.log('check filterDto:', filterDto);
        if (Object.keys(filterDto).length) {
            return this.tasksService.GetTasksFilterDto(filterDto);
        }
        else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        console.log(createTaskDto);
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }
}
