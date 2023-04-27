import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Auth } from 'src/decorators/auth.decorator';
import { RoleEnum } from 'src/enums/Role.enum';
import { SuccMessageReponseVo } from 'src/utils/vo/succ-message-response.vo';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { TaskReponseVo } from './vo/taskResponse.vo';
import { FindAllReportInTheTaskVo } from './vo/findAllReportInTheTaskResponse.vo';
import { ReportResponseVo } from '../report/vo/reportResponse.vo';

@ApiTags('Task')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Auth(RoleEnum.TEACHER)
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<SuccMessageReponseVo> {
    return this.tasksService.create(createTaskDto, user);
  }

  @Auth()
  @Get()
  findAll(): Promise<TaskReponseVo[]> {
    return this.tasksService.findAll();
  }

  @ApiOperation({ description: '查询所有在此任务下的提交报告' })
  @Auth(RoleEnum.TEACHER)
  @Get('/find/all/report/:id')
  findAllReportInTheTask(
    @Param('id') id: string,
  ): Promise<FindAllReportInTheTaskVo[]> {
    return this.tasksService.findAllReportInTheTask(+id);
  }

  @Auth(RoleEnum.TEACHER)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<SuccMessageReponseVo> {
    return this.tasksService.remove(+id);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<TaskReponseVo> {
    return this.tasksService.findOne(+id);
  }

  @ApiOperation({
    description: '查找该任务下面的该用户的提交',
  })
  @Auth(RoleEnum.STUDENT)
  @Get('/find/report/by/user/:id')
  findReportByUserInTheTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ReportResponseVo[]> {
    return this.tasksService.findReportByUser(+id, user.id);
  }
}
