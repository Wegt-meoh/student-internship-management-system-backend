import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-user.dto';
import { Student } from './entities/student.entity';
import { FindAllStudentResponseVo } from './vo/findAll-response.vo';
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
    const student = await this.studentRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          phone,
        },
      },
    });
    if (!student) {
      throw new BadRequestException('no such student');
    }

    const { user, ...res } = student;
    const { password, ...res1 } = user;
    return {
      ...res,
      ...res1,
    };
  }

  async findAllStudent(): Promise<FindAllStudentResponseVo> {
    const studentList = await this.studentRepository.find({
      relations: ['user'],
    });

    return {
      data: studentList.map((student) => {
        const { user, ...res } = student;
        const { password, ...res1 } = user;
        return {
          ...res,
          ...res1,
        };
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
