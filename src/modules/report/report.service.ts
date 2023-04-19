import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { StudentService } from '../user/student/student.service';
import { plainToInstance } from 'class-transformer';
import { SearchReportDto } from './dto/search-report.dto';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    private studentService: StudentService,
    private taskService: TasksService,
  ) {}

  async create(createReportDto: CreateReportDto, user: User) {
    const { taskId } = createReportDto;
    const task = await this.taskService.findOne(taskId);
    if (!task) {
      throw new BadRequestException('no such task');
    }

    const { id: studentId } = await this.studentService.findByUserId(user.id);
    const report = {
      ...createReportDto,
      studentId,
    };
    return this.reportRepository.save(report);
  }

  findBy(searchReportDto: SearchReportDto) {
    return this.reportRepository.findBy({ ...searchReportDto });
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
