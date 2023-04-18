import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { TeacherService } from '../user/teacher/teacher.service';
import { User } from '../user/entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private teacherService: TeacherService,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const teacher = await this.teacherService.getTeacherInfo(user.phone);

    const task = {
      ...createTaskDto,
      teacherId: teacher.teacherId,
    };
    return this.taskRepository.save(task);
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findBy({ id });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.save(
      plainToInstance(Task, { ...updateTaskDto, id }),
    );
  }

  remove(id: number) {
    return this.taskRepository.remove(plainToInstance(Task, { id }));
  }
}
