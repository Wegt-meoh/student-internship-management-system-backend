import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exist = await this.userRepository.findOneBy({
      phone: createUserDto.phone,
    });
    if (exist) {
      throw new BadRequestException('电话号码已注册');
    }

    const user = plainToInstance(User, {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });

    await this.userRepository.save(user);

    return {
      message: '用户创建成功',
    };
  }

  async search(searchUserDto: SearchUserDto) {
    return this.userRepository.findBy(searchUserDto);
  }
}
