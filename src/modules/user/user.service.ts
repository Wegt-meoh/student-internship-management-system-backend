import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateStudentDto,
  CreateTeacherDto,
  CreateUserDto,
} from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Teacher } from './entities/teacher.entity';
import { Student } from './entities/student.entity';
import {
  FindAllStudentResponseVo,
  FindAllTeacherResponseVo,
  StudentResponseDataItem,
  TeacherResponseDataItem,
} from './vo/findAll-response.vo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

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

  async findAllStudent(): Promise<FindAllStudentResponseVo> {
    const studentList = await this.studentRepository.find({
      relations: ['user'],
    });

    return {
      data: studentList.map((student) => {
        const studentResponseItem = new StudentResponseDataItem();
        studentResponseItem.id = student.user.id;
        studentResponseItem.class = student.class;
        studentResponseItem.name = student.user.name;
        studentResponseItem.phone = student.user.phone;
        studentResponseItem.role = student.user.role;
        return studentResponseItem;
      }),
    };
  }

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    const user = await this.createUser(createTeacherDto);

    const teacher = new Teacher();
    teacher.facuties = createTeacherDto.facuties;
    teacher.user = user;

    await this.teacherRepository.save(teacher);

    return {
      message: '注册教师成功',
    };
  }

  async createStudentDto(createStudentDto: CreateStudentDto) {
    const user = await this.createUser(createStudentDto);

    const student = new Student();
    student.class = createStudentDto.class;
    student.user = user;

    await this.studentRepository.save(student);

    return {
      message: '注册学生成功',
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    const exist = await this.findOne(createUserDto.phone);
    if (exist) {
      throw new BadRequestException('电话号码已注册');
    }

    const user = new User();
    user.name = createUserDto.name;
    user.phone = createUserDto.phone;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.role = createUserDto.role;
    await this.userRepository.save(user);
    return user;
  }

  async findOne(phone: string) {
    return await this.userRepository.findOneBy({ phone });
  }

  async remove(phone: string) {
    const user = new User();
    user.phone = phone;
    return await this.userRepository.remove(user);
  }
}
