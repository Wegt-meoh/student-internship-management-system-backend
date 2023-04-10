import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterResponseVo } from './vo/register-response.vo';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { RoleEnum } from './role.enum';
import { CreateStudentDto } from './dto/create-student.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({
    status: '2XX',
    type: () => RegisterResponseVo,
  })
  @Post('/student/signup')
  register(@Body() createStudentDto: CreateStudentDto) {
    if (createStudentDto.role === RoleEnum.student) {
      return this.userService.createStudentDto(createStudentDto);
    } else {
      throw new BadRequestException('请求角色参数错误');
    }
  }

  @Post('/teacher/signup')
  signup(@Body() createTeacherDto: CreateTeacherDto) {
    if (createTeacherDto.role === RoleEnum.teacher) {
      return this.userService.createTeacher(createTeacherDto);
    } else {
      throw new BadRequestException('参数错误');
    }
  }
}
