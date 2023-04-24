import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { PostService } from '../post/post.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) taskRepo: Repository<Task>) {}
}
