import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();
    try {
      const user = request.user;
      if (!Array.isArray(requireRoles) || requireRoles.length === 0) {
        return true;
      }
      return requireRoles.some((requireRole) => requireRole === user.role);
    } catch {
      return false;
    }
  }
}
