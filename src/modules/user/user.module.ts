import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Teacher } from './entities/teacher.entity';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Teacher, Student])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
