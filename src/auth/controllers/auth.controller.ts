import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() AuthDto: AuthDto) {
    const user = await this.authService.login(AuthDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const jwt = this.authService.generateToken(user);
    return jwt;
  }
}
