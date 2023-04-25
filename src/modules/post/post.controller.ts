import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
import { FindAllTaskAndReportCountVo } from './vo/findAllTaskAndReportCount.vo';
import { FindAllTaskAndOneReportVo } from './vo/findAllTaskAndOneReport.vo';
import { PostResponseVo } from './vo/postResponse.vo';

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
  @Get('/find/all/student/:id')
  findAllStudentInThePost(@Param('id') id: string): Promise<UserResponseVo[]> {
    return this.postService.findAllStudentInThePost(+id);
  }

  @ApiOperation({ description: '查询此岗位下的所有任务以及报告提交数量' })
  @Auth()
  @Get('/find/all/task/:id')
  findAllTaskAndReportCount(
    @Param('id') id: string,
  ): Promise<FindAllTaskAndReportCountVo> {
    return this.postService.findAllTaskInThePost(+id);
  }

  @ApiOperation({ description: '查询此岗位下的所有任务以及当前用户的提交' })
  @Auth(RoleEnum.STUDENT)
  @Get('/find/all/task/and/one/report/:id')
  findAllTaskAndOneReport(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<FindAllTaskAndOneReportVo[]> {
    return this.postService.findAllTaskAndOneReport(+id, user);
  }

  @Auth(RoleEnum.TEACHER)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<SuccMessageReponseVo> {
    return this.postService.delete(+id);
  }

  @ApiOperation({
    description: '教师请求返回所有的负责岗位，学生请求则返回所有参与岗位',
  })
  @Auth()
  @Get('/list')
  list(@GetUser() user: User): Promise<PostResponseVo[]> {
    if (user.role === RoleEnum.TEACHER) {
      return this.postService.findAllCreatePost(user.id);
    } else if (user.role === RoleEnum.STUDENT) {
      return this.postService.findAllJoinPost(user.id);
    } else {
      return this.postService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostResponseVo> {
    return this.postService.findOne(+id);
  }
}
