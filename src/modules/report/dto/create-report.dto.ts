import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    name: 'url',
    example: 'http://localhost:8001/serverRoot/sjdkfj12jl31k.doc',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({
    name: 'taskId',
    example: 2,
  })
  @IsNumber()
  taskId: number;
}
