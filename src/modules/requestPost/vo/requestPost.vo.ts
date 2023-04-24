import { ApiProperty } from '@nestjs/swagger';
import { RequestPostStatus } from 'src/enums/RequestPostStatus.enum';
import { FindAllPostResponseVo } from 'src/modules/post/vo/findAllPostResponse.vo';
import { UserResponseVo } from 'src/modules/user/vo/userResponse.vo';

export class RequestPostVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: RequestPostStatus;
}
