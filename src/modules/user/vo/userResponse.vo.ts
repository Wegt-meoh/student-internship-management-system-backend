import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/Role.enum';

export class UserResponseVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ nullable: true })
  facuties: string | null;

  @ApiProperty({ nullable: true })
  class: string | null;

  @ApiProperty()
  role: RoleEnum;
}
