import { TaskStatus } from '../task.model';

export class UpdateTaskByIdDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
