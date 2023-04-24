import { ApiProperty } from '@nestjs/swagger';
import { RequestPostStatus } from 'src/enums/RequestPostStatus.enum';

export class RequestPostVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: RequestPostStatus;
}
