import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';

async function bootstrap() {
  const port = 3002;
  const app = await NestFactory.create(TasksModule);
  await app.listen(port);
  console.log(`http://localhost:${port}/`);
}
bootstrap();
