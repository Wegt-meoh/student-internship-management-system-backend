import { Controller, Get, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AppService } from './app.service';
import { Auth } from './decorator/auth';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @ApiTags('首页')
  @Auth()
  getHello(): string {
    return this.appService.getHello();
  }
}
