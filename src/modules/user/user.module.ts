import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Teacher } from './teacher/teacher.entity';
import { Student } from './student/student.entity';
import { StudentService } from './student/student.service';
import { TeacherService } from './teacher/teacher.service';
import { TeacherController } from './teacher/teacher.controller';
import { StudentController } from './student/student.controller';
import { UserController } from './user.controller';
import { StudentPostService } from './student-post/student-post.service';
import { StudentPostController } from './student-post/student-post.controller';
import { StudentPost } from './student-post/student-post.entity';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forFeature([User, Teacher, Student, StudentPost]),
  ],
  controllers: [
    UserController,
    TeacherController,
    StudentController,
    StudentPostController,
  ],
  providers: [UserService, StudentService, TeacherService, StudentPostService],
  exports: [UserService, StudentService, TeacherService],
})
export class UserModule {}
