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
import { RoleEnum } from '../../enums/role.enum';
import {
  FindAllStudentResponseVo,
  FindAllTeacherResponseVo,
} from './vo/findAll-response.vo';
import { Roles } from '../../decorators/roles.decorator';
import { CreateStudentDto, CreateTeacherDto } from './dto/create-user.dto';
import {
  StudentInfoResponseVo,
  TeacherInfoResponseVo,
} from './vo/info-response.vo';
import { RolesGuard } from 'src/guards/role.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/teacher/findAll')
  findAllTeacher() {
    return this.userService.findAllTeacher();
  }

  @ApiOkResponse({
    type: () => TeacherInfoResponseVo,
  })
  @ApiBearerAuth()
  @Roles(RoleEnum.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/teacher/info')
  teacherInfo() {
    return 'get teacher info';
  }

  @ApiOkResponse({
    type: () => StudentInfoResponseVo,
  })
  @ApiBearerAuth()
  @Roles(RoleEnum.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/student/info')
  studentInfo() {
    return 'get student info';
  }
}
