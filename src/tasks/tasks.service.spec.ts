import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from './models/task.entity';

const mockTasksService = () => ({
    getTaskWithFilter: jest.fn(),
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
        it('calls TasksSerivce.getTaskWithFilter and return the result', () => {
            expect(tasksService.getTaskWithFilter).not.toHaveBeenCalled();
            // call tasksService.getTaskWithFilter
            tasksService.getTaskWithFilter(null, mockUser);
            expect(tasksService.getTaskWithFilter).toHaveBeenCalled();
        });
    });
});