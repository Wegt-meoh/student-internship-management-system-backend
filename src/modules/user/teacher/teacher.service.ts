import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { FindAllTeacherResponseVo } from '../vo/findAll-response.vo';
import { TeacherInfoResponseVo } from '../vo/info-response.vo';
import { CreateTeacherDto } from './create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    private userService: UserService,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    const user = await this.userService.createUser(createTeacherDto);

    const teacher = new Teacher();
    teacher.facuties = createTeacherDto.facuties;
    teacher.user = user;

    await this.teacherRepository.save(teacher);

    return {
      statusCode: 200,
      message: '注册教师成功',
    };
  }

  async getTeacherInfo(phone: string): Promise<TeacherInfoResponseVo> {
    const teacher = await this.teacherRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          phone: phone,
        },
      },
    });
    if (!teacher) {
      throw new BadRequestException('no such teacher');
    }

    const { user, id: teacherId, ...res } = teacher;
    const { password, id: userId, ...res1 } = user;
    return {
      ...res,
      ...res1,
      teacherId,
      userId,
    };
  }

  async findAllTeacher(): Promise<FindAllTeacherResponseVo> {
    const teacherList = await this.teacherRepository.find({
      relations: ['user'],
    });

    return {
      data: teacherList.map((teacher) => {
        const { user, id: teacherId, ...res } = teacher;
        const { password, id: userId, ...res1 } = user;
        return {
          ...res,
          ...res1,
          teacherId,
          userId,
        };
      }),
    };
  }

  async findByTeacherId(teacherId: number) {
    return await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: ['user'],
    });
  }
}
