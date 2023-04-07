import { ApiProperty } from '@nestjs/swagger';

export class BasicResponseVo {
  @ApiProperty({ description: '状态码', example: 200 })
  statusCode: number;

  @ApiProperty({ description: '请求结果消息', example: '请求成功' })
  message: string;
}
