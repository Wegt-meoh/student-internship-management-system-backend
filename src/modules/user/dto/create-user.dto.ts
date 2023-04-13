import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { RoleEnum } from '../../../enums/role.enum';

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
    example: 'teacher',
  })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}

export class CreateTeacherDto extends CreateUserDto {
  @ApiProperty({
    name: 'facuties',
    example: '机械与电气工程学院',
  })
  @IsString()
  @IsNotEmpty()
  facuties: string;
}

export class CreateStudentDto extends CreateUserDto {
  @ApiProperty({
    name: 'class',
    example: '计算机192',
  })
  @IsString()
  @IsNotEmpty()
  class: string;
}
