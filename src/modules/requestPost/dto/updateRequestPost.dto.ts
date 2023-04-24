import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { RequestPostStatus } from 'src/enums/RequestPostStatus.enum';

export class UpdateRequestPostDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsEnum(RequestPostStatus)
  status: RequestPostStatus;
}
