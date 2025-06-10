import { TaskStatus } from '../task.model';

export class CreateTaskDto {
  title: string;
  description: TaskStatus;
}
