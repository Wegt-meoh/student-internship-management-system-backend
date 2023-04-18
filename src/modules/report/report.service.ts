import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { StudentService } from '../user/student/student.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    private studentService: StudentService,
  ) {}

  async create(createReportDto: CreateReportDto, user: User) {
    const { id: studentId } = await this.studentService.findByUserId(user.id);
    const report = {
      ...createReportDto,
      studentId,
    };
    return this.reportRepository.save(report);
  }

  findAll() {
    return this.reportRepository.find();
  }

  findOne(id: number) {
    return this.reportRepository.findBy({ id });
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
