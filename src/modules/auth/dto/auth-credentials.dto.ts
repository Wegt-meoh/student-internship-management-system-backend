import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    name: 'phone',
    example: '18787878787',
  })
  @IsString()
  @Length(11, 11)
  phone: string;

  @ApiProperty({
    name: 'password',
    example: '123456',
  })
  @IsString()
  @Length(6, 32)
  password: string;
}
