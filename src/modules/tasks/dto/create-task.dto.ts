import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    name: 'title',
    example: '这是一个标题',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'description',
    example: '这是描述',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    name: 'postId',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @ApiProperty({
    name: 'attachmentUrl',
    example: 'http://localhost:8001/serverRoot',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  attachmentUrl: string;
}
