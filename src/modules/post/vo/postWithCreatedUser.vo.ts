import { ApiProperty } from '@nestjs/swagger';
import { UserResponseVo } from 'src/modules/user/vo/userResponse.vo';
import { PostResponseVo } from './postResponse.vo';

export class PostWithCreatedUserVo extends PostResponseVo {
  @ApiProperty({
    type: () => UserResponseVo,
  })
  createdUser: UserResponseVo;
}
