import { ApiProperty } from '@nestjs/swagger';

export class FindPostByUserDto {
  @ApiProperty({
    name: 'user_id',
    example: 1,
  })
  user_id: number;
}
