import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './shared/tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
