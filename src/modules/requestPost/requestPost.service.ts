import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RequestPost } from './requestPost.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRequestPostDto } from './dto/createRequestPost.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateRequestPostDto } from './dto/updateRequestPost.dto';
import { User } from '../user/user.entity';
import { PostEntity } from 'src/modules/post/post.entity';
import { RequestPostStatus } from 'src/enums/RequestPostStatus.enum';

@Injectable()
export class RequestPostService {
  constructor(
    @InjectRepository(RequestPost)
    private requestPostRepo: Repository<RequestPost>,
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createRequestPostDto: CreateRequestPostDto, user: User) {
    const { postId } = createRequestPostDto;
    const { id: userId } = user;

    const postExist = await this.postRepo.findOneBy({ id: postId });
    if (!postExist) {
      throw new BadRequestException('岗位不存在');
    }

    const pendingOrResolveRequest = await this.requestPostRepo.findOneBy([
      {
        targetPost: { id: postId },
        status: RequestPostStatus.PEDING,
      },
      {
        targetPost: { id: postId },
        status: RequestPostStatus.RESOLVE,
      },
    ]);
    if (pendingOrResolveRequest) {
      throw new BadRequestException('岗位正在处理，请勿重复提交申请');
    }

    await this.requestPostRepo.save(
      plainToInstance(RequestPost, {
        requestUser: { id: userId },
        targetPost: { id: postId },
      }),
    );

    return {
      message: '创建成功',
    };
  }

  async update(updateRequestPostDto: UpdateRequestPostDto) {
    const { id, status } = updateRequestPostDto;
    await this.requestPostRepo.save(
      plainToInstance(RequestPost, { id, status }),
    );

    return {
      message: '修改成功',
    };
  }

  async remove(id: number) {
    await this.requestPostRepo.remove(plainToInstance(RequestPost, { id }));
    return {
      message: '删除成功',
    };
  }

  teacherFindAll(user: User) {
    return this.postRepo.find({
      where: { createdUser: { id: user.id } },
      relations: {
        requested: {
          requestUser: true,
        },
      },
    });
  }

  studentFindAll(user: User) {
    return this.userRepo.findOne({
      where: { id: user.id },
      relations: {
        requestPost: {
          targetPost: {
            createdUser: true,
          },
        },
      },
    });
  }
}
