import { PostResponseVo } from 'src/modules/post/vo/postResponse.vo';
import { RequestPostVo } from './requestPost.vo';
import { UserResponseVo } from 'src/modules/user/vo/userResponse.vo';
import { ApiProperty } from '@nestjs/swagger';

class TeacherFindAllVoRequested extends RequestPostVo {
  @ApiProperty({
    type: UserResponseVo,
  })
  requestUser: UserResponseVo;
}

export class TeacherFindAllVo extends PostResponseVo {
  @ApiProperty({
    isArray: true,
    type: TeacherFindAllVoRequested,
  })
  requested: TeacherFindAllVoRequested[];
}
