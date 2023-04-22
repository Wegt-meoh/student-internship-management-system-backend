import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    name: 'name',
    example: '前端开发工程师',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'position',
    example: '杭州',
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({
    name: 'company',
    example: '阿里巴巴',
  })
  @IsString()
  @IsNotEmpty()
  company: string;
}
