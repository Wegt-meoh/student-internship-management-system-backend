import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TeacherService } from './teacher.service';

import { TokenResponse } from './vo/token.vo';
import { BadRequestResponseVo } from 'src/vo/badRequestResponse.vo';
import { BasicResponseVo } from 'src/vo/basicRqestResponse.vo';
import { TeacherInfoResponse } from './vo/teacher-info.vo';
import { AuthGuard } from '@nestjs/passport';
import { extractTokenFromAuthorization } from 'src/utils/token.utils';
import { Request } from 'express';

@ApiTags('教师模块')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({
    description: '注册',
    type: BasicResponseVo,
  })
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
  @ApiBadRequestResponse({
    description: '登入失败',
    type: BadRequestResponseVo,
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    return await this.teacherService.login(loginDto);
  }

  @Get('info')
  @ApiOkResponse({ description: '获取教师信息', type: TeacherInfoResponse })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBadRequestResponse({
    description: '获取信息失败',
    type: BadRequestResponseVo,
  })
  async info(@Req() req: Request): Promise<TeacherInfoResponse> {
    const token = extractTokenFromAuthorization(req.headers.authorization);
    if (!token) {
      console.log(token);
      throw new BadRequestException('token error');
    }

    return {
      statusCode: 200,
      message: '成功获取',
      data: await this.teacherService.getInfoByToken(token),
    };
  }
}
