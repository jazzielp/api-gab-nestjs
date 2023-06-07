import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { PUBLIC_KEY, ROLES_KEY } from '../../constants/key-decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES_KEY>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest<Request>();

    const { roleUser } = request;

    if (roles === undefined) {
      return true;
    }

    const isRole = roles.some((role) => role === roleUser);

    if (!isRole) {
      throw new UnauthorizedException(
        'You do not have permission for this operation',
      );
    }
    return true;
  }
}
