import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Auth } from 'src/decorators/auth.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { SearchPostDto } from './dto/find-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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
  @Post('search')
  findBy(@Body() searchPostDto: SearchPostDto) {
    return this.postService.search(searchPostDto);
  }

  @Auth()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Auth(RoleEnum.TEACHER)
  @Patch(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(updatePostDto, id);
  }

  @Auth(RoleEnum.TEACHER)
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.postService.remove(id, user);
  }
}
