import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TeacherService } from './teacher.service';
import { TeacherInfoResponse } from './vo/teacher-info.vo';
import { TokenResponse } from './vo/token.vo';

@ApiTags('教师模块')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ description: '注册', type: TeacherInfoResponse })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.teacherService.register(registerDto);
    return {
      code: 301,
      message: '注册成功，请登入',
    };
  }

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: '登入', type: TokenResponse })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.teacherService.login(loginDto);
  }
}
