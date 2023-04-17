import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/role.enum';

class UserInfoResponseVo {
  @ApiProperty({
    name: 'name',
    example: '章三',
  })
  name: string;

  @ApiProperty({
    name: 'phone',
    example: '18787878787',
  })
  phone: string;

  @ApiProperty({
    name: 'role',
    example: RoleEnum.TEACHER,
  })
  role: RoleEnum;

  @ApiProperty({
    name: 'userId',
    example: 1,
  })
  userId: number;
}

export class StudentInfoResponseVo extends UserInfoResponseVo {
  @ApiProperty({
    name: 'class',
    example: '计算机192',
  })
  class: string;

  @ApiProperty({
    name: 'studentId',
    example: 2,
  })
  studentId: number;
}

export class TeacherInfoResponseVo extends UserInfoResponseVo {
  @ApiProperty({
    name: 'facuties',
    example: '机械与电气工程学院',
  })
  facuties: string;

  @ApiProperty({
    name: 'teacherId',
    example: 3,
  })
  teacherId: number;
}
