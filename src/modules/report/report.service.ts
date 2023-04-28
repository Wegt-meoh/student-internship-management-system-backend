import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Task } from '../tasks/task.entity';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ) {}

  async create(createReportDto: CreateReportDto, user: User) {
    const { taskId, attachmentUrl } = createReportDto;

    const taskExist = await this.taskRepo.findOneBy({ id: taskId });
    if (!taskExist) {
      throw new BadRequestException('任务不存在');
    }

    const reportExist = await this.reportRepo.findOneBy({
      task: { id: taskId },
      user: { id: user.id },
    });
    if (reportExist) {
      throw new BadRequestException('报告已存在，请勿重复提交');
    }

    await this.reportRepo.save(
      plainToInstance(Report, { attachmentUrl, task: taskExist, user }),
    );

    return {
      message: '创建成功',
    };
  }

  findAll() {
    return this.reportRepo.find();
  }

  async update(updateReportDto: UpdateReportDto) {
    const { id, score } = updateReportDto;
    const report = await this.reportRepo.findOneBy({ id });
    if (!report) {
      throw new BadRequestException('报告不存在');
    }

    await this.reportRepo.save(plainToInstance(Report, { id, score }));
    return {
      message: '评分成功',
    };
  }

  async delete(id: number) {
    const report = await this.reportRepo.findOneBy({ id });
    if (report && report.score) {
      throw new BadRequestException('报告已经评分完成，无法修改');
    }

    await this.reportRepo.remove(plainToInstance(Report, { id }));
    return {
      message: '删除成功',
    };
  }
}
