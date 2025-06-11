import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // Patch,
  Post,
  // Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskByIdDto } from './dto/updateTaskById.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  // if (Object.keys(filterDto).length) {
  // return this.tasksService.getTasksWithFilters(filterDto);
  // }
  // return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const res = await this.tasksService.createTask(createTaskDto);
    return res;
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  // @Patch('/:id')
  // updateTaskById(
  //   @Param('id') id: string,
  //   @Body() updateTaskByIdDto: UpdateTaskByIdDto,
  // ): Promise<Task> {
  //   return this.tasksService.updateTaskById(id, updateTaskByIdDto);
  // }
}
