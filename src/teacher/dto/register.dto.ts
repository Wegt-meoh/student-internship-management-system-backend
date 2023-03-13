import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isNotEmpty, IsString, Matches } from 'class-validator';
import { regMobileCN } from 'src/utils/reg';

export class RegisterDto {
  @ApiProperty({
    description: '手机号 用于登陆 唯一',
    example: '18846571928',
  })
  @Matches(regMobileCN, { message: '请输入正确的手机号' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly phone: string;

  @ApiProperty({ description: '教师姓名', example: '王大拿' })
  @IsNotEmpty({ message: '请输入姓名' })
  @IsString({ message: '请输入正确的姓名' })
  readonly name: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiProperty({
    description: '二次用户密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly passwordRepeat: string;
}
