import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentPost } from './student-post.entity';
import { Repository } from 'typeorm';
import { CreateStudentPostDto } from './dto/create-student-post.dto';
import { UpdateStudentPostDto } from './dto/update-student-post.dto';
import { TeacherService } from '../teacher/teacher.service';
import { PostService } from 'src/modules/post/post.service';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities/user.entity';
import { PostEntity } from 'src/modules/post/post.entity';

@Injectable()
export class StudentPostService {
  constructor(
    @InjectRepository(StudentPost)
    private studentPostRepository: Repository<StudentPost>,
    private teacherService: TeacherService,
    private postService: PostService,
  ) {}

  async create(createStudentPostDto: CreateStudentPostDto) {
    return this.studentPostRepository.save(createStudentPostDto);
  }

  async update(updateStudentPostDto: UpdateStudentPostDto) {
    return this.studentPostRepository.save(updateStudentPostDto);
  }

  async remove(id: number) {
    const entity = await this.studentPostRepository.findOne({ where: { id } });
    return this.studentPostRepository.remove(entity);
  }

  async findAll() {
    return this.studentPostRepository.find();
  }

  async findByStudentId(studentId: number) {
    return this.studentPostRepository.findOneBy({ studentId });
  }

  async findByUserId(userId: number) {
    return this.studentPostRepository.findBy(
      plainToInstance(StudentPost, { userId }),
    );
  }

  async findByTeacherId(teacherId: number) {
    const teacher = await this.teacherService.findByTeacherId(teacherId);
    const postList = await this.postService.search(
      plainToInstance(PostEntity, { userId: teacher.user.id }),
    );
    let queryBuild = this.studentPostRepository.createQueryBuilder();
    postList.forEach((post) => {
      queryBuild = queryBuild.orWhere({ post_id: post.id });
    });

    return queryBuild.execute();
  }
}
