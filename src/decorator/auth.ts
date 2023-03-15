import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/types/role';
import { RoleGuard } from './guards';

export function Auth(role?: Role) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(AuthGuard('jwt'), RoleGuard),
    ApiBearerAuth(),
  );
}
