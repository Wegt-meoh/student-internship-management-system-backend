import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class SearchTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    name: 'teacherId',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  teacherId: number;
}
