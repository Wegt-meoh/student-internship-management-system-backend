import { ApiProperty } from '@nestjs/swagger';

export class ReportResponseVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  attachmentUrl: string;

  @ApiProperty({ nullable: true })
  score: number | null;
}
