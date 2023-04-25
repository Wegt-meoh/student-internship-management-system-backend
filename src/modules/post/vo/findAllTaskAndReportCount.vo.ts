import { ApiProperty } from '@nestjs/swagger';
import { TaskReponseVo } from 'src/modules/tasks/vo/taskResponse.vo';

export class FindAllTaskAndReportCountVo {
  @ApiProperty({
    type: TaskReponseVo,
    isArray: true,
  })
  taskData: TaskReponseVo[];

  @ApiProperty()
  reportCount: number[];
}
