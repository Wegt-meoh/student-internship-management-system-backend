import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserResponseVo } from './vo/userResponse.vo';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccMessageReponseVo } from '../../utils/vo/succ-message-response.vo';
import { SearchUserDto } from './dto/search-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Auth()
  @Get('info')
  async info(@GetUser() user: User): Promise<UserResponseVo> {
    return user;
  }

  @Post()
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SuccMessageReponseVo> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.search({});
  }
}
