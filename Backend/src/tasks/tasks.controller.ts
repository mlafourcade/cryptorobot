import { TasksService } from './shared/tasks.service';
import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Task } from './shared/task';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  async getAll(): Promise<Task[]> {
    return this.tasksService.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getById(id);
  }
  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() task: Task): Promise<Task> {
    task.id = id;
    return this.tasksService.update(task);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }
}
