import { ApiProperty } from '@nestjs/swagger';
import { UserResponseVo } from 'src/modules/user/vo/userResponse.vo';

export class FindAllPostResponseVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  company: string;

  @ApiProperty({
    type: () => UserResponseVo,
  })
  createdUser: UserResponseVo;
}
