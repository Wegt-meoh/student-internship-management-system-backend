import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';

export class CreateStudentDto extends CreateUserDto {
  @ApiProperty({
    name: 'class',
    example: '计算机192',
  })
  @IsString()
  @IsNotEmpty()
  class: string;
}
