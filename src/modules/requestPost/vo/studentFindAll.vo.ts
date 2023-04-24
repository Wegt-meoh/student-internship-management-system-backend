import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserResponseVo } from 'src/modules/user/vo/userResponse.vo';
import { RequestPostVo } from './requestPost.vo';
import { PostResponseVo } from 'src/modules/post/vo/postResponse.vo';

class StudentFindAllRequestPostTargetPost extends PostResponseVo {
  @ApiProperty({
    type: UserResponseVo,
  })
  createdUser: UserResponseVo;
}

class StudentFindAllRequestPost extends RequestPostVo {
  @ApiProperty({
    type: StudentFindAllRequestPostTargetPost,
  })
  targetPost: StudentFindAllRequestPostTargetPost;
}

export class StudentFindAllVo extends UserResponseVo {
  @ApiProperty({
    isArray: true,
    type: StudentFindAllRequestPost,
  })
  requestPost: StudentFindAllRequestPost[];
}
