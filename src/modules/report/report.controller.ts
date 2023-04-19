import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { SearchReportDto } from './dto/search-report.dto';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Auth(RoleEnum.STUDENT)
  @Post()
  create(@Body() createReportDto: CreateReportDto, @GetUser() user: User) {
    return this.reportService.create(createReportDto, user);
  }

  @Auth()
  @Post('findBy')
  findBy(@Body() searchReportDto: SearchReportDto) {
    return this.reportService.findBy(searchReportDto);
  }

  @Auth(RoleEnum.STUDENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }

  @Auth(RoleEnum.STUDENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }
}
