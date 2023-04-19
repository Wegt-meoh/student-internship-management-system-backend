import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    name: 'attachmentUrl',
    example: 'http://localhost:8001/serverRoot/sjdkfj12jl31k.doc',
  })
  @IsNotEmpty()
  @IsString()
  attachmentUrl: string;

  @ApiProperty({
    name: 'taskId',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  taskId: number;
}
