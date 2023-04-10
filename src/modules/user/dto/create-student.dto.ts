import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class CreateStudentDto extends CreateUserDto {
  @ApiProperty({
    name: 'class',
    example: '计算机192',
  })
  class: string;
}
