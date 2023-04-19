import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { TeacherService } from '../user/teacher/teacher.service';
import { User } from '../user/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { PostService } from '../post/post.service';
import { SearchTaskDto } from './dto/search-task.dto';
import { PostEntity } from '../post/post.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private teacherService: TeacherService,
    private postService: PostService,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const post = await this.postService.findOne(createTaskDto.postId);
    if (!post) {
      throw new BadRequestException('no such post');
    }

    const teacher = await this.teacherService.getTeacherInfo(user.phone);

    const task = {
      ...createTaskDto,
      teacherId: teacher.teacherId,
    };
    return this.taskRepository.save(task);
  }

  findBy(task: SearchTaskDto) {
    return this.taskRepository.findBy({ ...task });
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({ id });
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
