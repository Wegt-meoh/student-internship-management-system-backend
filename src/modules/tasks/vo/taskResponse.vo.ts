import { ApiProperty } from '@nestjs/swagger';

export class TaskReponseVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  attachmentUrl: string;

  @ApiProperty()
  createDate: Date;
}
