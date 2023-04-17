import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/role.enum';
import { FindAllStudentResponseVo } from '../vo/findAll-response.vo';
import { RegisterResponseVo } from '../vo/register-response.vo';
import { CreateStudentDto } from './create-student.dto';

@ApiTags('Student')
@Controller('/student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @ApiOkResponse({
    type: () => RegisterResponseVo,
  })
  @Post('/signup')
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
  @Get()
  findAllStudent(): Promise<FindAllStudentResponseVo> {
    return this.studentService.findAllStudent();
  }
}
