import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { OssService } from './oss.service';
import { ApiOperation, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/decorators/auth.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';

@ApiTags('OSS')
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

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
}
