import { ApiProperty } from '@nestjs/swagger';

export class TokenItem {
  @ApiProperty({ description: 'token', example: 'asdkjfkadjsfkldsjflkdsa' })
  token: string;
}

export class TokenVo {
  @ApiProperty({ type: TokenItem })
  info: TokenItem;
}

export class TokenResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '数据', type: TokenVo, example: TokenVo })
  data: TokenVo;

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string;
}
