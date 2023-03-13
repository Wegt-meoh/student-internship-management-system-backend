import { ApiProperty } from '@nestjs/swagger';

export class TeacherInfoItem {
  @ApiProperty({ description: '教师id', example: 1 })
  id: number;

  @ApiProperty({
    description: '手机号',
    example: '13347872678',
  })
  phone: string;
}

export class TeacherInfoVo {
  @ApiProperty({ type: TeacherInfoItem })
  info: TeacherInfoItem;
}

export class TeacherInfoResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({
    description: '返回数据',
    type: () => TeacherInfoVo,
    example: TeacherInfoVo,
  })
  data: TeacherInfoVo;

  @ApiProperty({ description: '请求结果消息', example: '请求成功' })
  message: string;
}
