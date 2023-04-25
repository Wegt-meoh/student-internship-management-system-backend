import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/Role.enum';
import { Auth } from 'src/decorators/auth.decorator';
import { SuccMessageReponseVo } from 'src/utils/vo/succ-message-response.vo';
import { CreateReportDto } from './dto/create-report.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportResponseVo } from './vo/reportResponse.vo';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Auth(RoleEnum.STUDENT)
  @Post()
  create(
    @Body() createReportDto: CreateReportDto,
    @GetUser() user: User,
  ): Promise<SuccMessageReponseVo> {
    return this.reportService.create(createReportDto, user);
  }

  @Auth(RoleEnum.TEACHER)
  @Patch()
  update(
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<SuccMessageReponseVo> {
    return this.reportService.update(updateReportDto);
  }

  @Get()
  findAll(): Promise<ReportResponseVo[]> {
    return this.reportService.findAll();
  }

  @Auth(RoleEnum.STUDENT)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<SuccMessageReponseVo> {
    return this.reportService.delete(+id);
  }
}
