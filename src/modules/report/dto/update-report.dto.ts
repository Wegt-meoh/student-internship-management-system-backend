import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateReportDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
