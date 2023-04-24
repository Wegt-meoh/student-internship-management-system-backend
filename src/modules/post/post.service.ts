import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { RequestPostStatus } from 'src/enums/RequestPostStatus.enum';

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
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: {
        taskList: true,
      },
    });

    if (!post) {
      return [];
    }

    return post.taskList;
  }
}
