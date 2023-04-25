import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { RequestPostStatus } from 'src/enums/RequestPostStatus.enum';
import { Task } from '../tasks/task.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    await this.postRepository.save(
      plainToInstance(PostEntity, { ...createPostDto, createdUser: user }),
    );

    return {
      message: '创建成功',
    };
  }

  async findOne(postId: number) {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new BadRequestException('无此岗位');
    }
    return post;
  }

  findAll() {
    return this.postRepository.find({
      relations: {
        createdUser: true,
      },
    });
  }

  async findAllStudentInThePost(postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: {
        requested: {
          requestUser: true,
        },
      },
    });

    if (!post) {
      return [];
    }

    return post.requested
      .filter((requestPost) => {
        return requestPost.status === RequestPostStatus.RESOLVE;
      })
      .map((requestPost) => {
        return requestPost.requestUser;
      });
  }

  async findAllTaskInThePost(postId: number) {
    const taskList = await this.taskRepo.find({
      where: { targetPost: { id: postId } },
      relations: {
        receivedReportList: true,
      },
    });

    if (taskList.length === 0) {
      return [];
    }

    return taskList;
  }

  async findAllTaskAndOneReport(postId: number, user: User) {
    const taskList = await this.taskRepo.find({
      where: {
        targetPost: { id: postId },
      },
      relations: {
        receivedReportList: {
          user: true,
        },
      },
    });

    taskList.forEach((task) => {
      task.receivedReportList = task.receivedReportList.filter((report) => {
        return report.user.id === user.id;
      });
    });

    return taskList;
  }

  async delete(postId: number) {
    await this.postRepository.remove(
      plainToInstance(PostEntity, { id: postId }),
    );

    return {
      message: '删除成功',
    };
  }

  async findAllCreatePost(userId: number) {
    return this.postRepository.find({ where: { createdUser: { id: userId } } });
  }

  async findAllJoinPost(userId: number) {
    return this.postRepository.find({
      where: {
        requested: {
          requestUser: { id: userId },
          status: RequestPostStatus.RESOLVE,
        },
      },
    });
  }
}
