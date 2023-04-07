import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    description: 'token',
    example: 'sdhfakjdsfjasasd.sdafadsfdsdsaf.sdasdfdsaf',
  })
  @IsNotEmpty({ message: 'token不能为空' })
  @IsString()
  readonly token: string;
}
