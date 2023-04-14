import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-user.dto';
import { Student } from './entities/student.entity';
import {
  FindAllStudentResponseVo,
  StudentResponseDataItem,
} from './vo/findAll-response.vo';
import { StudentInfoResponseVo } from './vo/info-response.vo';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Injectable()
export class StudentService {
  constructor(
    private userService: UserService,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudentInfo(phone: string): Promise<StudentInfoResponseVo> {
    const studentResponse = new StudentInfoResponseVo();
    const user = await this.userService.findOneByPhone(phone);
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

  async createStudent(createStudentDto: CreateStudentDto) {
    const user = await this.userService.createUser(createStudentDto);

    const student = new Student();
    student.class = createStudentDto.class;
    student.user = user;

    await this.studentRepository.save(student);

    return {
      statusCode: 200,
      message: '注册学生成功',
    };
  }
}
