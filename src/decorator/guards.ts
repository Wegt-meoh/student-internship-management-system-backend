import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const metaRole = this.reflector.getAllAndOverride<string>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (metaRole === undefined) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const reqRole = req.cookies.role as string;
    return reqRole === metaRole;
  }
}
