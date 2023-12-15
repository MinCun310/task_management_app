import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from './models/task.entity';
import { TaskStatus } from './models/task-status.enum';

const mockTasksService = () => ({
    getTaskWithFilter: jest.fn(),
    getTaskById: jest.fn(),
});

const mockUser = {
    id: 'someId',
    username: 'Cuong',
    password: 'somePassword',
    task: []
};

describe('TasksService', () => {
    let tasksService: TasksService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService, {
                    provide: TasksService,
                    useFactory: mockTasksService
                }
            ],
        }).compile();

        tasksService = module.get(TasksService);
    });

    describe('getTaskWithFilter', () => {
        it('calls TasksSerivce.getTaskWithFilter and return the result', async () => {
            expect(tasksService.getTaskWithFilter).not.toHaveBeenCalled();
            // call tasksService.getTaskWithFilter
            await tasksService.getTaskWithFilter(null, mockUser);
            expect(tasksService.getTaskWithFilter).toHaveBeenCalled();
        });
    });

    describe('getTaskById', () => {
        it('calls TasksService.getTaskById and returns the result', async () => {
            const mockTask = {
                title: 'Test title',
                description: 'Test desc',
                id: 'someId',
                status: TaskStatus.OPEN,
            };
            await tasksService.getTaskById('someId', mockUser);
            expect(tasksService.getTaskById).toHaveBeenCalled();
        });
    });
});