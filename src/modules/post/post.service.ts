import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { SearchPostDto } from './dto/find-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    await this.postRepository.save(
      plainToInstance(PostEntity, { ...createPostDto, user }),
    );
    return {
      message: '创建成功',
    };
  }

  async remove(id: number, user: User) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (post.user.id !== user.id) {
      throw new ForbiddenException('无法删除此岗位');
    }

    return this.postRepository.remove(plainToInstance(PostEntity, { id }));
  }

  async search(searchPostDto: SearchPostDto) {
    return this.postRepository.find({
      where: { ...searchPostDto },
      relations: ['user'],
    });
  }

  update(updatePostDto: UpdatePostDto, id: number) {
    return this.postRepository.save(
      plainToInstance(PostEntity, {
        id,
        ...updatePostDto,
      }),
    );
  }

  async findAll() {
    return this.postRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }
}
