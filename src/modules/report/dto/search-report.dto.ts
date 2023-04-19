import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SearchReportDto extends PartialType(CreateReportDto) {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  studentId: number;
}
