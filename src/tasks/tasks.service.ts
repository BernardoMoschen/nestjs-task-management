import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskByIdDto } from './dto/updateTaskById.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id) as Task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return;
  }

  updateTaskById(id: string, updateTaskByIdDto: UpdateTaskByIdDto): Task {
    const task = this.getTaskById(id);
    const { title, description, status } = updateTaskByIdDto;
    task.title = title ? title : task.title;
    task.description = description ? description : task.description;
    task.status = status ? status : task.status;
    this.tasks = this.tasks.map((t) => (t.id === id ? task : t));
    return task;
  }
}
