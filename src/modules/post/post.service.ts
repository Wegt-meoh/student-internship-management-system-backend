import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    const post = createPostDto.data.map((item) => {
      return {
        ...item,
        user,
      };
    });
    await this.postRepository.save(post);
    return {
      message: '创建成功',
    };
  }

  async remove(post: PostEntity) {
    return this.postRepository.remove([post]);
  }

  async findAll() {
    return this.postRepository.find({ relations: ['user'] });
  }

  async findByUser(user: User) {
    const result = await this.postRepository.find({
      relations: ['user'],
      where: { user },
    });
    return result;
  }

  async findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }
}
