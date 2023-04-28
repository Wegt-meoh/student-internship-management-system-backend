import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserResponseVo } from './vo/userResponse.vo';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccMessageReponseVo } from '../../utils/vo/succ-message-response.vo';
import { RoleEnum } from 'src/enums/Role.enum';
import { UpdateUserInfoDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Auth()
  @Get('/info')
  async getSelfInfo(@GetUser() user: User): Promise<UserResponseVo> {
    return user;
  }

  @Auth()
  @Get('/info/:id')
  async getInfoById(@Param('id') id: string): Promise<UserResponseVo> {
    return this.userService.findOneById(+id);
  }

  @Auth(RoleEnum.STUDENT)
  @Patch()
  update(
    @Body() updateUserDto: UpdateUserInfoDto,
    @GetUser() user: User,
  ): Promise<SuccMessageReponseVo> {
    return this.userService.updateInfo(updateUserDto, +user.id);
  }

  @Auth()
  @Patch('/password')
  updatePassword(
    @Body() updateDto: UpdateUserPasswordDto,
    @GetUser() user: User,
  ): Promise<SuccMessageReponseVo> {
    return this.userService.updatePassword(updateDto, user);
  }

  @Post()
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SuccMessageReponseVo> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.search({});
  }
}
