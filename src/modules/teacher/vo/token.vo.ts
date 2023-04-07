import { ApiProperty } from '@nestjs/swagger';

export class TokenItem {
  @ApiProperty({ description: 'token', example: 'asdkjfkadjsfkldsjflkdsa' })
  token: string;
  @ApiProperty({ description: '姓名', example: '张三' })
  name: string;
  @ApiProperty({ description: '院系', example: '机械与电气工程学院' })
  facuties: string;
  @ApiProperty({ description: '角色', example: 'teacher' })
  role: string;
}

export class TokenVo {
  @ApiProperty({ type: TokenItem })
  info: TokenItem;
}

export class TokenResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  statusCode: number;

  @ApiProperty({ description: '数据', type: TokenVo, example: TokenVo })
  data: TokenVo;

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string;
}
