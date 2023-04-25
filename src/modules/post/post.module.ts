import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostController } from './post.controller';
import { Task } from '../tasks/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, Task])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
