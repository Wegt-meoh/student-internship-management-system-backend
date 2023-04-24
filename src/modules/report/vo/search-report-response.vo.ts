import { ApiProperty } from '@nestjs/swagger';

export class SearchReportResponseVo {
  @ApiProperty({
    name: 'reportId',
  })
  reportId: number;

  @ApiProperty({
    name: 'createDate',
  })
  createDate: Date;

  @ApiProperty({
    name: 'attachmentUrl',
  })
  attachmentUrl: string;

  @ApiProperty({
    name: 'taskId',
  })
  taskId: number;

  @ApiProperty({
    name: 'taskTitle',
  })
  taskTitle: string;

  @ApiProperty({
    name: 'taskDescription',
  })
  taskDescription: string;

  @ApiProperty({
    name: 'studentId',
  })
  studentId: number;

  @ApiProperty({
    name: 'studentName',
  })
  studentName: string;

  @ApiProperty({
    name: 'studentClass',
  })
  studentClass: string;

  @ApiProperty({
    name: 'score',
    nullable: true,
  })
  score: number | null;
}
