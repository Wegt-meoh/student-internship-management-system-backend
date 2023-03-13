import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<TeacherInfoResponse> {
    return this.teacherService.register(registerDto);
  }

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: '登入', type: TokenResponse })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.teacherService.login(loginDto);
  }
}
