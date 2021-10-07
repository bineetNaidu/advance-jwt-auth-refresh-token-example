import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new HttpException("User Doesn't exists!", HttpStatus.BAD_REQUEST);
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      throw new HttpException('UNAUTHORIZED!', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async register(data: RegisterDto) {
    const hash = await argon2.hash(data.password, { hashLength: 12 });
    const user = await this.userRepo.create({ ...data, password: hash }).save();

    return user;
  }

  async getRefreshToken(accessToken: string) {
    return {
      accessToken,
    };
  }
}
