import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../role.enum';

export class BasicDataItem {
  @ApiProperty({
    name: 'phone',
    example: '18787878787',
  })
  phone: string;

  @ApiProperty({
    name: 'role',
    example: RoleEnum.STUDENT,
  })
  role: RoleEnum;

  @ApiProperty({
    name: 'id',
    example: 12,
  })
  id: number;

  @ApiProperty({
    name: 'name',
    example: '章三',
  })
  name: string;
}

export class StudentResponseDataItem extends BasicDataItem {
  @ApiProperty({
    name: 'class',
    example: '计算机192',
  })
  class: string;
}

export class TeacherResponseDataItem extends BasicDataItem {
  @ApiProperty({
    name: 'facuties',
    example: '机械与电气工程学院',
  })
  facuties: string;
}

export class FindAllStudentResponseVo {
  @ApiProperty({
    name: 'data',
    isArray: true,
    type: StudentResponseDataItem,
  })
  data: StudentResponseDataItem[];
}

export class FindAllTeacherResponseVo {
  @ApiProperty({
    name: 'data',
    isArray: true,
    type: TeacherResponseDataItem,
  })
  data: TeacherResponseDataItem[];
}
