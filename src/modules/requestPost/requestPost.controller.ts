import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RequestPostService } from './requestPost.service';
import { Auth } from 'src/decorators/auth.decorator';
import { RoleEnum } from 'src/enums/Role.enum';
import { CreateRequestPostDto } from './dto/createRequestPost.dto';
import { SuccMessageReponseVo } from 'src/utils/vo/succ-message-response.vo';
import { UpdateRequestPostDto } from './dto/updateRequestPost.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { TeacherFindAllVo } from './vo/teacherFIndAll.vo';
import { StudentFindAllVo } from './vo/studentFindAll.vo';

@ApiTags('RequestPost')
@Controller('requestPost')
export class RequestPostController {
  constructor(private requestPostService: RequestPostService) {}

  @Auth(RoleEnum.STUDENT)
  @Post()
  create(
    @Body() createRequestPostDto: CreateRequestPostDto,
    @GetUser() user: User,
  ): Promise<SuccMessageReponseVo> {
    return this.requestPostService.create(createRequestPostDto, user);
  }

  @Auth(RoleEnum.TEACHER)
  @Patch()
  update(
    @Body() updateRequestPostDto: UpdateRequestPostDto,
  ): Promise<SuccMessageReponseVo> {
    return this.requestPostService.update(updateRequestPostDto);
  }

  @Auth(RoleEnum.TEACHER)
  @Get('teacher')
  teacherFindAll(@GetUser() user: User): Promise<TeacherFindAllVo[]> {
    return this.requestPostService.teacherFindAll(user);
  }

  @Auth(RoleEnum.STUDENT)
  @Get('student')
  studentFindAll(@GetUser() user: User): Promise<StudentFindAllVo> {
    return this.requestPostService.studentFindAll(user);
  }

  @Auth(RoleEnum.STUDENT)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<SuccMessageReponseVo> {
    return this.requestPostService.remove(+id);
  }
}
