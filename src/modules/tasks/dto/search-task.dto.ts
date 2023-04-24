import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchTaskDto {
  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  createdUserId?: number;

  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  targetPostId?: number;
}
