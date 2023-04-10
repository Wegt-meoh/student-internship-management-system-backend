import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterResponseVo } from './vo/register-response.vo';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({
    status: '2XX',
    type: () => RegisterResponseVo,
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return {
      statusCode: 200,
      message: '成功注册',
    };
  }
}
