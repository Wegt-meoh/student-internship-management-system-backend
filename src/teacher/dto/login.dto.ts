import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regMobileCN } from 'src/utils/reg';

export class LoginDto {
  @ApiProperty({ description: '手机号 唯一', example: '18846571928' })
  @Matches(regMobileCN, { message: '请输入正确的手机号' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly phone: string;

  @ApiProperty({ description: '用户密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
