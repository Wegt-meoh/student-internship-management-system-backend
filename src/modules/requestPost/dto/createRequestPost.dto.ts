import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRequestPostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
