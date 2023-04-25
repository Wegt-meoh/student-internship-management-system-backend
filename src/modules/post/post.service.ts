import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { RequestPostStatus } from 'src/enums/RequestPostStatus.enum';
import { Task } from '../tasks/task.entity';

@Injectable()
export class PostService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    await this.postRepository.save(
      plainToInstance(PostEntity, { ...createPostDto, createdUser: user }),
    );

    return {
      message: '创建成功',
    };
  }

  findOne(postId: number) {
    return this.postRepository.findOneBy({ id: postId });
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

  async findAllTaskInThePost(postId: number): Promise<{
    taskData: Task[];
    reportCount: number[];
  }> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: {
        taskList: {
          receivedReportList: true,
        },
      },
    });

    if (!post) {
      return {
        taskData: [],
        reportCount: [],
      };
    }

    return {
      taskData: post.taskList,
      reportCount: post.taskList.map((task) => {
        return task.receivedReportList.length;
      }),
    };
  }

  async findAllTaskAndOneReport(postId: number, user: User) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
        taskList: {
          receivedReportList: {
            user: { id: user.id },
          },
        },
      },
      relations: {
        taskList: {
          receivedReportList: {
            user: true,
          },
        },
      },
    });

    if (!post) {
      return [];
    }

    return post.taskList;
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
