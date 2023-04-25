import { UserResponseVo } from 'src/modules/user/vo/userResponse.vo';
import { RequestPostVo } from './requestPost.vo';
import { PostResponseVo } from 'src/modules/post/vo/postResponse.vo';
import { ApiProperty } from '@nestjs/swagger';
import { PostWithCreatedUserVo } from 'src/modules/post/vo/postWithCreatedUser.vo';

export class RequestPostWithStudentAndPostVo extends RequestPostVo {
  @ApiProperty({
    type: UserResponseVo,
  })
  requestUser: UserResponseVo;

  @ApiProperty({
    type: PostWithCreatedUserVo,
  })
  targetPost: PostWithCreatedUserVo;
}
