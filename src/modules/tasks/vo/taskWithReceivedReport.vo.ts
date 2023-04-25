import { ReportResponseVo } from 'src/modules/report/vo/reportResponse.vo';
import { TaskReponseVo } from './taskResponse.vo';
import { ApiProperty } from '@nestjs/swagger';

export class TaskWithReceivedReportVo extends TaskReponseVo {
  @ApiProperty({
    type: ReportResponseVo,
    isArray: true,
  })
  receivedReportList: ReportResponseVo[];
}
