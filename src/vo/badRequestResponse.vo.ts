import { ApiProperty } from '@nestjs/swagger';
import { BasicResponseVo } from './basicRqestResponse.vo';

export class BadRequestResponseVo extends BasicResponseVo {
  @ApiProperty({ description: '状态码', example: 400 })
  statusCode: number;

  @ApiProperty({ description: '请求结果消息', example: '请求失败' })
  message: string;
}
