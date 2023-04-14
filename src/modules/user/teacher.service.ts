import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-user.dto';
import {
  FindAllTeacherResponseVo,
  TeacherResponseDataItem,
} from './vo/findAll-response.vo';
import { TeacherInfoResponseVo } from './vo/info-response.vo';

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
    const teacherResponse = new TeacherInfoResponseVo();
    const user = await this.userService.findOneByPhone(phone);
    if (!user) {
      throw new BadRequestException('no such user');
    }

    const teacher = await this.teacherRepository.findOneBy({ user: user });
    if (!teacher) {
      throw new BadRequestException('no such teacher');
    }

    teacherResponse.name = user.name;
    teacherResponse.phone = user.phone;
    teacherResponse.role = user.role;
    teacherResponse.facuties = teacher.facuties;
    return teacherResponse;
  }

  async findAllTeacher(): Promise<FindAllTeacherResponseVo> {
    const teacherList = await this.teacherRepository.find({
      relations: ['user'],
    });

    return {
      data: teacherList.map((teacher) => {
        const teacherResponseItem = new TeacherResponseDataItem();
        teacherResponseItem.id = teacher.user.id;
        teacherResponseItem.facuties = teacher.facuties;
        teacherResponseItem.name = teacher.user.name;
        teacherResponseItem.phone = teacher.user.phone;
        teacherResponseItem.role = teacher.user.role;
        return teacherResponseItem;
      }),
    };
  }
}
