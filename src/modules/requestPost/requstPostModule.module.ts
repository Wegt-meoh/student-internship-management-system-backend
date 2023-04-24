import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/modules/post/post.entity';
import { RequestPost } from './requestPost.entity';
import { RequestPostService } from './requestPost.service';
import { RequestPostController } from './requestPost.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestPost, PostEntity, User])],
  providers: [RequestPostService],
  controllers: [RequestPostController],
})
export class RequestPostModule {}
