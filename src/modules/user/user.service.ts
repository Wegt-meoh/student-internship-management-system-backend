import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { Teacher } from './entities/teacher.entity';
import { Student } from './entities/student.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

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
