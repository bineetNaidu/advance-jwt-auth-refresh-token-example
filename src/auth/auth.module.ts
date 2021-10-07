import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthsMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthsMiddleware).forRoutes({
      path: 'api/auth/login',
      method: RequestMethod.POST,
    });
    consumer.apply(AuthsMiddleware).forRoutes({
      path: 'api/auth/register',
      method: RequestMethod.POST,
    });
  }
}
