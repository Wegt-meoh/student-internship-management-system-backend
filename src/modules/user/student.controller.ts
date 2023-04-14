import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { CreateStudentDto } from './dto/create-user.dto';
import { FindAllStudentResponseVo } from './vo/findAll-response.vo';
import { StudentInfoResponseVo } from './vo/info-response.vo';
import { RegisterResponseVo } from './vo/register-response.vo';

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
  @ApiBearerAuth()
  @Roles(RoleEnum.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/student/info')
  studentInfo(@GetUser('phone') phone: string): Promise<StudentInfoResponseVo> {
    return this.studentService.getStudentInfo(phone);
  }
}
