import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateStudentPostDto } from './dto/create-student-post.dto';
import { StudentPostService } from './student-post.service';
import { UpdateStudentPostDto } from './dto/update-student-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from '../student/student.service';
import { PostService } from 'src/modules/post/post.service';
import { plainToInstance } from 'class-transformer';
import { Student } from '../student/student.entity';
import { PostEntity } from 'src/modules/post/post.entity';
import { Auth } from 'src/decorators/auth.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { RoleEnum } from 'src/enums/role.enum';

@ApiTags('Student-Post')
@Controller('student-post')
export class StudentPostController {
  constructor(
    private studentPostService: StudentPostService,
    private studentService: StudentService,
    private postSerive: PostService,
  ) {}

  @Auth(RoleEnum.STUDENT)
  @Post()
  async create(@Body() createStudentPostDto: CreateStudentPostDto) {
    const { studentId, postId } = createStudentPostDto;

    const student = await this.studentService.findOne(
      plainToInstance(Student, { id: studentId }),
    );
    if (!student) {
      throw new BadRequestException();
    }

    const post = await this.postSerive.findOne(postId);
    if (!post) {
      throw new BadRequestException();
    }
    return this.studentPostService.create(createStudentPostDto);
  }

  @Auth(RoleEnum.TEACHER)
  @Post('update')
  update(@Body() updateStudentPostDto: UpdateStudentPostDto) {
    return this.studentPostService.update(updateStudentPostDto);
  }

  @Get()
  @Auth()
  async findById(@GetUser() user: User) {
    if (user.role === RoleEnum.STUDENT) {
      const student = await this.studentService.findByUserId(user.id);
      return this.studentPostService.findByStudentId(student.id);
    } else {
      return this.studentPostService.findByUserId(user.id);
    }
  }
}
