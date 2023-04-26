import { UserResponseVo } from 'src/modules/user/vo/userResponse.vo';
import { RequestPostVo } from './requestPost.vo';
import { ApiProperty } from '@nestjs/swagger';
import { PostResponseVo } from 'src/modules/post/vo/postResponse.vo';

export class RequestPostWithStudentAndPostVo extends RequestPostVo {
  @ApiProperty({
    type: UserResponseVo,
  })
  requestUser: UserResponseVo;

  @ApiProperty({
    type: PostResponseVo,
  })
  targetPost: PostResponseVo;
}
