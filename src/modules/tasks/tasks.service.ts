import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { PostEntity } from '../post/post.entity';
import { plainToInstance } from 'class-transformer';
import { Report } from '../report/report.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const { postId, ...res } = createTaskDto;

    const postExist = await this.postRepo.findOneBy({ id: postId });
    if (!postExist) {
      throw new BadRequestException('岗位不存在');
    }

    await this.taskRepo.save(
      plainToInstance(Task, {
        ...res,
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

  async findAllReportInTheTask(taskId: number) {
    const task = await this.taskRepo.findOne({
      where: { id: taskId },
      relations: {
        receivedReportList: {
          user: true,
        },
      },
    });

    if (!task) {
      return [];
    }

    return task.receivedReportList;
  }

  async remove(taskId: number) {
    await this.taskRepo.remove(plainToInstance(Task, { id: taskId }));
    return {
      message: '删除成功',
    };
  }

  findOne(taskId: number) {
    return this.taskRepo.findOneBy({ id: taskId });
  }

  findReportByUser(taskId: number, userId: number) {
    return this.reportRepo.findBy({
      task: { id: taskId },
      user: { id: userId },
    });
  }
}
