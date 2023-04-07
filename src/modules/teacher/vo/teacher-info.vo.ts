import { ApiProperty } from '@nestjs/swagger';
import { BasicResponseVo } from 'src/vo/basicRqestResponse.vo';

export class TeacherInfoItem {
  @ApiProperty({
    description: '手机号',
    example: '13347872678',
  })
  phone: string;

  @ApiProperty({
    description: '姓名',
    example: '张三',
  })
  name: string;

  @ApiProperty({
    description: '院系',
    example: '机械与电气工程学院',
  })
  facuties: string;
}

export class TeacherInfoVo {
  @ApiProperty({ type: TeacherInfoItem })
  info: TeacherInfoItem;
}

export class TeacherInfoResponse extends BasicResponseVo {
  @ApiProperty({
    description: '返回数据',
    type: () => TeacherInfoVo,
    example: TeacherInfoVo,
  })
  data: TeacherInfoVo;
}
