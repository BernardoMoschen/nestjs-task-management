import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TaksService } from './taks/taks.service';

@Module({
  imports: [TasksModule],
  providers: [TaksService],
})
export class AppModule {}
