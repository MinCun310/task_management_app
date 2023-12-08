import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './models/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/models/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private tasksService: TasksService;
    private logger = new Logger('TasksController');
    constructor(tasksService: TasksService) {
        this.tasksService = tasksService;
    }

    @Get()
    async getTaskWithFilter(@Query() tasksFilterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        if (Object.keys(tasksFilterDto).length) {
            this.logger.verbose(`User ${user.username} retrieving all tasks. Filter: ${JSON.stringify(tasksFilterDto)}`);
            return this.tasksService.getTaskWithFilter(tasksFilterDto, user);
        } else {
            this.logger.verbose(`User ${user.username} retrieving all tasks. Filter: ${JSON.stringify(user.task)}`);
            return this.tasksService.getAllTask(user);
        }
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    async updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user: User): Promise<Task> {
        const { status } = updateTaskStatusDto;
        console.log('check status:', status);
        return this.tasksService.updateTaskStatus(id, status, user);
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
