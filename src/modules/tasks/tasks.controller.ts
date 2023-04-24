import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Auth } from 'src/decorators/auth.decorator';
import { RoleEnum } from 'src/enums/Role.enum';
import { SuccMessageReponseVo } from 'src/utils/vo/succ-message-response.vo';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { TaskReponseVo } from './vo/taskResponse.vo';

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
}
