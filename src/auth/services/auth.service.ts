import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';

import { UserService } from '../../usuario/services/user.service';
import { AuthDto } from '../dto/auth';
import { User } from '../../usuario/entities/user.entity';
import { PayLoadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  //We bring the user to validate the password
  // ...........................................................................
  public async login(AuthDto: AuthDto): Promise<User | null> {
    const { username, password } = AuthDto;
    const userByEmail = await this.userService.findBy({
      field: 'email',
      value: username,
    });

    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (!match) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return userByEmail;
    }

    const userByUser = await this.userService.findBy({
      field: 'username',
      value: username,
    });

    if (userByUser) {
      const match = await bcrypt.compare(password, userByUser.password);
      if (!match) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return userByUser;
    }

    return null;
  }

  //We create the JWT
  //............................................................................
  public singJWT({
    payload,
    secret,
    expires,
  }: {
    payload: Jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return Jwt.sign(payload, secret, { expiresIn: expires });
  }

  //We generate the token
  //............................................................................
  public async generateToken(user: User): Promise<any> {
    const getUser: User = await this.userService.findOne(user.id);
    const payload: PayLoadToken = {
      sub: getUser.id.toString(),
      role: getUser.role,
    };
    return {
      accessToken: this.singJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user: {
        id: getUser.id,
        firstName: getUser.firstname,
        lastName: getUser.lastname,
        role: getUser.role,
      },
    };
  }
}
