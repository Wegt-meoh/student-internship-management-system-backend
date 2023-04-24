import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { PostService } from '../post/post.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { PostEntity } from '../post/post.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const { postId, ...res } = createTaskDto;

    const postExist = await this.postRepo.findOneBy({ id: postId });
    if (!postExist) {
      throw new BadRequestException('岗位不存在');
    }

    await this.taskRepo.save(
      plainToInstance(Task, {
        ...createTaskDto,
        targetPost: postExist,
        createdUser: user,
      }),
    );

    return {
      message: '创建成功',
    };
  }

  findAll() {
    return this.taskRepo.find();
  }
}
