import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RequestPostService } from './requestPost.service';
import { Auth } from 'src/decorators/auth.decorator';
import { RoleEnum } from 'src/enums/Role.enum';
import { CreateRequestPostDto } from './dto/createRequestPost.dto';
import { SuccMessageReponseVo } from 'src/utils/vo/succ-message-response.vo';
import { UpdateRequestPostDto } from './dto/updateRequestPost.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { RequestPostWithStudentAndPostVo } from './vo/requestPostWithStudentAndPost.vo';

@ApiTags('RequestPost')
@Controller('/request/post')
export class RequestPostController {
  constructor(private requestPostService: RequestPostService) {}

  @Auth(RoleEnum.STUDENT)
  @Post()
  create(
    @Body() createRequestPostDto: CreateRequestPostDto,
    @GetUser() user: User,
  ): Promise<SuccMessageReponseVo> {
    return this.requestPostService.create(createRequestPostDto, user);
  }

  @ApiOperation({ description: '教师处理学生提交的岗位请求' })
  @Auth(RoleEnum.TEACHER)
  @Patch()
  update(
    @Body() updateRequestPostDto: UpdateRequestPostDto,
  ): Promise<SuccMessageReponseVo> {
    return this.requestPostService.update(updateRequestPostDto);
  }

  @ApiOperation({ description: '查询教师负责岗位的所有请求' })
  @Auth(RoleEnum.TEACHER)
  @Get('teacher')
  findAllRequestPostTheTeacherManage(
    @GetUser() user: User,
  ): Promise<RequestPostWithStudentAndPostVo[]> {
    return this.requestPostService.findAllRequestPostTheTeacherManage(user.id);
  }

  @ApiOperation({ description: '查询学生的岗位请求' })
  @Auth(RoleEnum.STUDENT)
  @Get('student')
  findAllRequestPostTheStudentSubmit(
    @GetUser() user: User,
  ): Promise<RequestPostWithStudentAndPostVo[]> {
    return this.requestPostService.findAllRequestPostTheStudentSubmit(user.id);
  }

  @Auth(RoleEnum.STUDENT)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<SuccMessageReponseVo> {
    return this.requestPostService.remove(+id);
  }
}
