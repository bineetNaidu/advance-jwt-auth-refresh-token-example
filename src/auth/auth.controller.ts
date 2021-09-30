import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.authService.login(username, password);
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('is_admin') is_admin: boolean,
  ) {
    return await this.authService.register(username, password, is_admin);
  }

  @Get('refresh_token')
  async getRefreshToken() {
    return this.authService.getRefreshToken('ohh refresh token lol!');
  }
}
