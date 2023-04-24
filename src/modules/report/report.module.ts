import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { UserModule } from '../user/user.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), UserModule, TasksModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
