import { PostResponseVo } from 'src/modules/post/vo/postResponse.vo';
import { RequestPostVo } from './requestPost.vo';
import { UserResponseVo } from 'src/modules/user/vo/userResponse.vo';
import { ApiProperty } from '@nestjs/swagger';

export class TeacherFindAllVo extends RequestPostVo {
  @ApiProperty({
    type: UserResponseVo,
  })
  requestUser: UserResponseVo;

  @ApiProperty({
    type: PostResponseVo,
  })
  targetPost: PostResponseVo;
}
