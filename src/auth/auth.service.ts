import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(username: string, password: string) {
    return {
      username,
      password,
    };
  }

  async register(username: string, password: string, is_admin: boolean) {
    return {
      username,
      password,
      is_admin,
    };
  }

  async getRefreshToken(accessToken: string) {
    return {
      accessToken,
    };
  }
}
