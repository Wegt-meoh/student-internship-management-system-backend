import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';

export class CreateTeacherDto extends CreateUserDto {
  @ApiProperty({
    name: 'facuties',
    example: '机械与电气工程学院',
  })
  @IsString()
  @IsNotEmpty()
  facuties: string;
}
