import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UpdateUserPasswordDto extends PickType(User, ['password']) {
  @ApiProperty()
  newPassword: string;
}
