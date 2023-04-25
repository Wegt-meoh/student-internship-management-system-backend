import { ApiProperty } from '@nestjs/swagger';
import { ReportResponseVo } from 'src/modules/report/vo/reportResponse.vo';
import { TaskReponseVo } from 'src/modules/tasks/vo/taskResponse.vo';

export class FindAllTaskAndOneReportVo extends TaskReponseVo {
  @ApiProperty({
    type: ReportResponseVo,
    isArray: true,
  })
  receivedReportList: ReportResponseVo[];
}
