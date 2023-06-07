import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { IUseToken } from '../interfaces/auth.interface';
import { PUBLIC_KEY } from '../../constants/key-decorator';
import { UserService } from '../../usuario/services/user.service';
import { useToken } from '../../utils/use.token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['token'];

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid Token');
    }

    const managerToken: IUseToken | string = useToken(token);

    if (typeof managerToken === 'string') {
      throw new UnauthorizedException(managerToken);
    }

    if (managerToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }

    const { sub } = managerToken;
    const user = await this.userService.findOne(+sub);

    if (!user) {
      throw new UnauthorizedException('Token user not found');
    }

    request.idUser = user.id;
    request.roleUser = user.role;

    return true;
  }
}
