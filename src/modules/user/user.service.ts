import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

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
}
