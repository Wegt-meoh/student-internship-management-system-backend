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
import {
  StudentInfoResponseVo,
  TeacherInfoResponseVo,
} from './vo/info-response.vo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getTeacherInfo(phone: string): Promise<TeacherInfoResponseVo> {
    const teacherResponse = new TeacherInfoResponseVo();
    const user = await this.userRepository.findOneBy({ phone });
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

  async getStudentInfo(phone: string): Promise<StudentInfoResponseVo> {
    const studentResponse = new StudentInfoResponseVo();
    const user = await this.userRepository.findOneBy({ phone });
    if (!user) {
      throw new BadRequestException('no such user');
    }

    const student = await this.studentRepository.findOneBy({ user });
    if (!student) {
      throw new BadRequestException('no such student');
    }

    studentResponse.name = user.name;
    studentResponse.class = student.class;
    studentResponse.phone = user.phone;
    studentResponse.role = user.role;

    return studentResponse;
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
      statusCode: 200,
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
      statusCode: 200,
      message: '注册学生成功',
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    const exist = await this.userRepository.findOneBy({
      phone: createUserDto.phone,
    });
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

  async findOneByPhone(phone: string) {
    return this.userRepository.findOneBy({ phone });
  }

  async remove(phone: string) {
    const user = new User();
    user.phone = phone;
    return await this.userRepository.remove(user);
  }
}
