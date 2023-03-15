import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { Teacher } from './entities/teacher.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
    private jwtSerice: JwtService,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }

  async register(registerDto: RegisterDto) {
    await this.checkRegisterForm(registerDto);

    const { name, password, phone } = registerDto;
    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);
    const newTeacher = new Teacher();
    newTeacher.name = name;
    newTeacher.phone = phone;
    newTeacher.password = hashPassword;
    newTeacher.salt = salt;
    await this.teacherRepository.save(newTeacher);
  }

  async checkRegisterForm(registerDto: RegisterDto): Promise<any> {
    if (registerDto.password !== registerDto.passwordRepeat) {
      throw new BadRequestException('两次输入密码不一致');
    }
    const { phone } = registerDto;
    const isExistUser = await this.teacherRepository.findOneBy({ phone });
    if (isExistUser) {
      throw new BadRequestException('手机号码已被注册，请登入');
    }
  }

  async checkLoginForm(loginDto: LoginDto) {
    const { phone, password } = loginDto;
    const teacher = await this.teacherRepository
      .createQueryBuilder('teacher')
      .addSelect('teacher.salt')
      .addSelect('teacher.password')
      .where('teacher.phone=:phone', { phone })
      .getOne();
    if (!teacher) {
      throw new BadRequestException('用户不存在');
    }

    const { password: hashPassword, salt } = teacher;
    const inputHashPassword = encryptPassword(password, salt);

    if (inputHashPassword !== hashPassword) {
      throw new BadRequestException('密码错误');
    }

    return teacher;
  }

  async createToken(teacher: Teacher) {
    return this.jwtSerice.sign({
      id: teacher.id,
      name: teacher.name,
      phone: teacher.phone,
      role: 'teacher',
    });
  }

  async login(loginDto: LoginDto) {
    const teacher = await this.checkLoginForm(loginDto);
    const token = await this.createToken(teacher);
    return {
      info: { token },
    };
  }
}
