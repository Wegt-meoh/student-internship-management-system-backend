import { ApiProperty } from '@nestjs/swagger';

export class SuccMessageReponseVo {
  @ApiProperty({
    type: 'string',
  })
  message: string;
}
