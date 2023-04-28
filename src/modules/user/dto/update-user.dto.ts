import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UpdateUserInfoDto extends PartialType(
  PickType(User, ['attachmentUrl', 'description']),
) {}
