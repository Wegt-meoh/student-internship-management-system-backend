import { PickType } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserResponseVo extends PickType(User, [
  'attachmentUrl',
  'class',
  'description',
  'facuties',
  'id',
  'name',
  'phone',
  'role',
]) {}
