import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SearchReportDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  studentId?: number | undefined;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  teacherId?: number | undefined;
}
