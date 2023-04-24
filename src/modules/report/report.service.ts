import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    private taskService: TasksService,
  ) {}

  async create(createReportDto: CreateReportDto, user: User) {
    // const { taskId } = createReportDto;
    // const task = await this.taskService.findOne(taskId);
    // if (!task) {
    //   throw new BadRequestException('no such task');
    // }
    // const { studentId } = await this.studentService.findByUserId(user.id);
    // const report = {
    //   ...createReportDto,
    //   studentId,
    // };
    // await this.reportRepository.save(report);
    // return {
    //   message: '成功提交',
    // };
  }

  findOne(id: number) {
    return this.reportRepository.findOneBy({ id });
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return this.reportRepository.save(
      plainToInstance(Report, { ...updateReportDto, id }),
    );
  }

  remove(id: number) {
    return this.reportRepository.remove(plainToInstance(Report, { id }));
  }
}
