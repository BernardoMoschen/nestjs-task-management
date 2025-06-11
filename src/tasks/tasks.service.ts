import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskByIdDto } from './dto/updateTaskById.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    return this.taskRepository.save({
      title,
      description,
    });
  }

  async deleteTaskById(id: string): Promise<void> {
    const row = await this.taskRepository.delete({ id });
    if (row.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return;
  }

  async updateTaskById(
    id: string,
    updateTaskByIdDto: UpdateTaskByIdDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    const { title, description, status } = updateTaskByIdDto;

    await this.taskRepository.update(id, {
      title: title ?? task.title,
      description: description ?? task.description,
      status: status ?? task.status,
    });

    return await this.getTaskById(id);
  }
}
