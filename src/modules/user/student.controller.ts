import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { CreateStudentDto } from './dto/create-user.dto';
import { FindAllStudentResponseVo } from './vo/findAll-response.vo';
import { StudentInfoResponseVo } from './vo/info-response.vo';
import { RegisterResponseVo } from './vo/register-response.vo';
import { Auth } from 'src/decorators/auth.decorator';

@ApiTags('Student')
@Controller('/student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @ApiOkResponse({
    type: () => RegisterResponseVo,
  })
  @Post('/student/signup')
  studentSignup(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<RegisterResponseVo> {
    if (createStudentDto.role === RoleEnum.STUDENT) {
      return this.studentService.createStudent(createStudentDto);
    } else {
      throw new BadRequestException('请求角色参数错误');
    }
  }

  @ApiOkResponse({
    type: () => FindAllStudentResponseVo,
  })
  @Get('/student/findAll')
  findAllStudent(): Promise<FindAllStudentResponseVo> {
    return this.studentService.findAllStudent();
  }

  @ApiOkResponse({
    type: () => StudentInfoResponseVo,
  })
  @Auth(RoleEnum.STUDENT)
  @Get('/student/info')
  studentInfo(@GetUser('phone') phone: string): Promise<StudentInfoResponseVo> {
    return this.studentService.getStudentInfo(phone);
  }
}
