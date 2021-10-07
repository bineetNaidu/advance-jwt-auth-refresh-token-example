import {
  NestMiddleware,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

type ErrType = {
  message: string;
  field: string;
};

@Injectable()
export class AuthsMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const err: ErrType[] = [];
    if (!req.body.password) {
      err.push({
        message: 'Password is required',
        field: 'password',
      });
    }
    if (!req.body.username) {
      err.push({
        message: 'Username is required',
        field: 'username',
      });
    }
    const formattedErr = {
      errors: err,
      statusCode: HttpStatus.BAD_REQUEST,
    };
    if (err.length > 0) {
      throw new HttpException(formattedErr, HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
