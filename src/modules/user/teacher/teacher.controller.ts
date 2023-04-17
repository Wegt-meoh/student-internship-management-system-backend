import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/role.enum';
import { FindAllTeacherResponseVo } from '../vo/findAll-response.vo';
import { RegisterResponseVo } from '../vo/register-response.vo';
import { CreateTeacherDto } from './create-teacher.dto';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @ApiOkResponse({
    type: () => RegisterResponseVo,
  })
  @Post('/signup')
  teacherSignup(
    @Body() createTeacherDto: CreateTeacherDto,
  ): Promise<RegisterResponseVo> {
    if (createTeacherDto.role === RoleEnum.TEACHER) {
      return this.teacherService.createTeacher(createTeacherDto);
    } else {
      throw new BadRequestException('参数错误');
    }
  }

  @ApiOkResponse({
    type: () => FindAllTeacherResponseVo,
  })
  @Get()
  findAllTeacher(): Promise<FindAllTeacherResponseVo> {
    return this.teacherService.findAllTeacher();
  }
}
