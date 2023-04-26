import { RequestPostVo } from './requestPost.vo';
import { PostWithCreatedUserVo } from 'src/modules/post/vo/postWithCreatedUser.vo';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllRequestPostTheStudentSubmitVo extends RequestPostVo {
  @ApiProperty({
    type: PostWithCreatedUserVo,
  })
  targetPost: PostWithCreatedUserVo;
}
