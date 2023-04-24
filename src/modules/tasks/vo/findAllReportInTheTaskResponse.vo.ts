import { ApiProperty } from '@nestjs/swagger';
import { ReportResponseVo } from 'src/modules/report/vo/reportResponse.vo';
import { UserResponseVo } from 'src/modules/user/vo/userResponse.vo';

export class FindAllReportInTheTaskVo extends ReportResponseVo {
  @ApiProperty({
    type: UserResponseVo,
  })
  user: UserResponseVo;
}
