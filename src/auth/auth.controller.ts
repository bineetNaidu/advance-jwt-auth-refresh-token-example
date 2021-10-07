import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

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
  async register(@Body() body: RegisterDto) {
    const res = await this.authService.register(body);
    return res;
  }

  @Get('refresh_token')
  async getRefreshToken() {
    return this.authService.getRefreshToken('ohh refresh token lol!');
  }
}
