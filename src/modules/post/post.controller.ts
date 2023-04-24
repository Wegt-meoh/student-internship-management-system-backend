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
import { RoleEnum } from 'src/enums/Role.enum';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { SuccMessageReponseVo } from 'src/utils/vo/succ-message-response.vo';
import { FindAllPostResponseVo } from './vo/findAllPostResponse.vo';
import { UserResponseVo } from '../user/vo/userResponse.vo';
import { TaskReponseVo } from '../tasks/vo/taskResponse.vo';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Auth(RoleEnum.TEACHER)
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<SuccMessageReponseVo> {
    return this.postService.create(createPostDto, user);
  }

  @Auth()
  @Get()
  findAll(): Promise<FindAllPostResponseVo[]> {
    return this.postService.findAll();
  }

  @ApiOperation({ description: '查询此岗位下的所有学生' })
  @Auth(RoleEnum.TEACHER)
  @Get('/student/:id')
  findAllStudentInThePost(@Param('id') id: string): Promise<UserResponseVo[]> {
    return this.postService.findAllStudentInThePost(+id);
  }

  @ApiOperation({ description: '查询此岗位下的所有任务' })
  @Auth(RoleEnum.TEACHER)
  @Get('/task/:id')
  findAllTaskInThePost(@Param('id') id: string): Promise<TaskReponseVo[]> {
    return this.postService.findAllTaskInThePost(+id);
  }
}
