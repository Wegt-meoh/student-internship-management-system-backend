import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseVo {
  @ApiProperty({
    name: '状态码',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    name: '返回信息',
    example: '注册成功',
  })
  message: string;
}
