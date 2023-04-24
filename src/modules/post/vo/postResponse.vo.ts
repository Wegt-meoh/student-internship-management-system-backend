import { ApiProperty } from '@nestjs/swagger';

export class PostResponseVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  company: string;
}
