import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Teacher } from './entities/teacher.entity';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { StudentController } from './student.controller';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Teacher, Student])],
  controllers: [UserController, TeacherController, StudentController],
  providers: [UserService, StudentService, TeacherService],
  exports: [UserService],
})
export class UserModule {}
