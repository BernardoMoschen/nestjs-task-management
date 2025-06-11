import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskByIdDto {
  title?: string;
  description?: string;

  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
