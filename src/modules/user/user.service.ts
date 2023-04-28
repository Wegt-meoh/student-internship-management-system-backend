import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserInfoDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOneById(userId: number) {
    const exist = await this.userRepository.findOneBy({ id: userId });
    if (!exist) {
      throw new BadRequestException('用户不存在');
    }

    return exist;
  }

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

  async updateInfo(updateUserDto: UpdateUserInfoDto, userId: number) {
    const { description, attachmentUrl } = updateUserDto;
    await this.userRepository.save(
      plainToInstance(User, { id: userId, description, attachmentUrl }),
    );

    return {
      message: '更新成功',
    };
  }

  async updatePassword(updateDto: UpdateUserPasswordDto, user: User) {
    const { password, newPassword } = updateDto;
    if (await bcrypt.compare(password, user.password)) {
      await this.userRepository.save(
        plainToInstance(User, {
          id: user.id,
          password: await bcrypt.hash(newPassword, 10),
        }),
      );

      return {
        message: '密码修改成功',
      };
    } else {
      throw new BadRequestException('原密码输入错误');
    }
  }
}
