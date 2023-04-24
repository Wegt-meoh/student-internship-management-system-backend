import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends OmitType(CreateReportDto, ['taskId']) {}
