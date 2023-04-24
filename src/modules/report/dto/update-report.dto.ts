import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateReportDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
