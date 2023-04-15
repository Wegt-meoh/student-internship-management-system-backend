import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { StudentService } from './student.service';
import { TeacherService } from './teacher.service';
import { TeacherInfoResponseVo } from './vo/info-response.vo';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
  ) {}

  @ApiOkResponse({
    description: '获取用户详情,返回学生或者教师',
    type: () => TeacherInfoResponseVo,
  })
  @Auth()
  @Get('info')
  async info(@GetUser() user: User) {
    const { role, phone } = user;
    if (role === RoleEnum.STUDENT) {
      return this.studentService.getStudentInfo(phone);
    } else {
      return this.teacherService.getTeacherInfo(phone);
    }
  }
}
