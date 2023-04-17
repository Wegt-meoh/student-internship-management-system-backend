import { ApiProperty } from '@nestjs/swagger';
import {
  StudentInfoResponseVo,
  TeacherInfoResponseVo,
} from './info-response.vo';

export class FindAllStudentResponseVo {
  @ApiProperty({
    name: 'data',
    isArray: true,
    type: StudentInfoResponseVo,
  })
  data: StudentInfoResponseVo[];
}

export class FindAllTeacherResponseVo {
  @ApiProperty({
    name: 'data',
    isArray: true,
    type: TeacherInfoResponseVo,
  })
  data: TeacherInfoResponseVo[];
}
