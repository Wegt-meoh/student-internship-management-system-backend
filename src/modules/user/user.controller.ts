import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterResponseVo } from './vo/register-response.vo';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { RoleEnum } from '../auth/enums/role.enum';
import { CreateStudentDto } from './dto/create-student.dto';
import {
  FindAllStudentResponseVo,
  FindAllTeacherResponseVo,
} from './vo/findAll-response.vo';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({
    type: () => RegisterResponseVo,
  })
  @Post('/student/signup')
  studentSignup(@Body() createStudentDto: CreateStudentDto) {
    if (createStudentDto.role === RoleEnum.STUDENT) {
      return this.userService.createStudentDto(createStudentDto);
    } else {
      throw new BadRequestException('请求角色参数错误');
    }
  }

  @ApiOkResponse({
    type: () => RegisterResponseVo,
  })
  @Post('/teacher/signup')
  teacherSignup(@Body() createTeacherDto: CreateTeacherDto) {
    if (createTeacherDto.role === RoleEnum.TEACHER) {
      return this.userService.createTeacher(createTeacherDto);
    } else {
      throw new BadRequestException('参数错误');
    }
  }

  @ApiOkResponse({
    type: () => FindAllStudentResponseVo,
  })
  @Get('/student/findAll')
  findAllStudent() {
    return this.userService.findAllStudent();
  }

  @ApiOkResponse({
    type: () => FindAllTeacherResponseVo,
  })
  @ApiBearerAuth()
  @Roles(RoleEnum.STUDENT)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/teacher/findAll')
  findAllTeacher() {
    return this.userService.findAllTeacher();
  }
}
