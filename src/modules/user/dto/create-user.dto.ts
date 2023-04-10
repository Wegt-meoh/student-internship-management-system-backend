import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'phone',
    example: '18787878787',
  })
  @Length(11, 11)
  @Matches(/^1[3-9][0-9]{9}$/)
  phone: string;

  @ApiProperty({
    name: 'name',
    example: '张久',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'password',
    example: '123456',
  })
  @Length(6, 32)
  password: string;

  @ApiProperty({
    name: 'role',
    example: '教师',
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}
