import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from './roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(
    ApiBearerAuth(),
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
