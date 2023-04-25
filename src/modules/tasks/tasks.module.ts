import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { PostEntity } from '../post/post.entity';
import { Report } from '../report/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, PostEntity, Report])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
