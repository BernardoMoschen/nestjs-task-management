import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { search, status } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    return this.taskRepository.save({
      title,
      description,
    });
  }

  async deleteTaskById(id: string): Promise<void> {
    await this.taskRepository.delete({ id });
    return;
  }
  // updateTaskById(id: string, updateTaskByIdDto: UpdateTaskByIdDto): Task {
  //   const task = this.getTaskById(id);
  //   const { title, description, status } = updateTaskByIdDto;
  //   task.title = title ? title : task.title;
  //   task.description = description ? description : task.description;
  //   task.status = status ? status : task.status;
  //   this.tasks = this.tasks.map((t) => (t.id === id ? task : t));
  //   return task;
  // }
}
