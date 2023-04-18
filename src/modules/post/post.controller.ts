import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Auth } from 'src/decorators/auth.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { PostEntity } from './post.entity';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Auth(RoleEnum.TEACHER)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.create(createPostDto, user);
  }

  @Auth()
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Auth()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    const post = new PostEntity();
    post.id = id;
    return this.postService.findOne(post);
  }

  @Auth()
  @Get('findByUser/:id')
  findByUser(@Param('id', ParseIntPipe) id: number) {
    const user = new User();
    user.id = id;
    return this.postService.findByUser(user);
  }

  @Auth()
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    const post = new PostEntity();
    post.id = id;
    return this.postService.remove(post);
  }
}
