import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { SearchTaskDto } from './dto/search-task.dto';

@ApiTags('Task')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Auth(RoleEnum.TEACHER)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Auth()
  @Post('findBy')
  findBy(@Body() searchTaskDto: SearchTaskDto) {
    return this.tasksService.findBy(searchTaskDto);
  }

  @Auth(RoleEnum.TEACHER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Auth(RoleEnum.TEACHER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
