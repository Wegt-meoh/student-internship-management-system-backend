import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  Header,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { OssService } from './oss.service';
import { ApiOperation, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/decorators/auth.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { createReadStream } from 'fs';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('OSS')
@Controller('oss')
export class OssController {
  private ossDomain: string;
  constructor(
    private ossService: OssService,
    private configService: ConfigService,
  ) {
    this.ossDomain = configService.get('OSS_DOMAIN');
  }

  @ApiOperation({
    description: '文件上传单个',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          description: '文件',
          type: 'string',
          format: 'binary',
        },
        comment: {
          description: '上传文件描述，可以是纯字符串，也可以是JSON字符串',
          type: 'string',
          format: 'text',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Auth()
  @Post()
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body('comment') comment: string,
    @GetUser() user: User,
  ) {
    if (!file) {
      throw new BadRequestException('upload file can not be undefined');
    }
    return this.ossService.create(file, comment, user);
  }

  @Auth()
  @Get()
  findByUser(@GetUser() user: User) {
    return this.ossService.findByUser(user);
  }

  @Get('download/:id')
  @Header('Content-Type', 'application/json')
  async getStaticFile(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const ossUrl = this.ossDomain + req.path;
    console.log(ossUrl);

    const ossEntity = await this.ossService.findOneByUrl(ossUrl);

    if (!ossEntity) {
      throw new NotFoundException('no such file');
    }

    const file = createReadStream(ossEntity.location);

    res.set({
      'Content-Disposition': `attachment; filename="${ossEntity.fileName}"`,
    });

    file.pipe(res);
  }
}
