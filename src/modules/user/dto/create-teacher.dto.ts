import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class CreateTeacherDto extends CreateUserDto {
  @ApiProperty({
    name: 'facuties',
    example: '机械与电气工程学院',
  })
  facuties: string;
}
