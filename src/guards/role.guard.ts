import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('role guard canActive invoke');
    const requireRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();
    try {
      const phone = request['phone'];
      const user = await this.userService.findOne(phone);
      if (!Array.isArray(requireRoles) || requireRoles.length === 0) {
        return true;
      }
      return requireRoles.some((requireRole) => requireRole === user.role);
    } catch {
      return false;
    }
  }
}
